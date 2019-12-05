/**
 * Experimental support for federation
 * https://github.com/MichalLytek/type-graphql/issues/351
 */

import { specifiedDirectives } from "graphql";
import federationDirectives from "@apollo/federation/dist/directives";
import gql from "graphql-tag";
import { printSchema, buildFederatedSchema as buildApolloFederationSchema } from "@apollo/federation";
import { addResolversToSchema, GraphQLResolverMap } from "apollo-graphql";
import { buildSchema, BuildSchemaOptions, ResolversMap, EnumResolver, ResolverObject } from "type-graphql";

import {
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLFieldMap,
  GraphQLSchema,
  GraphQLTypeResolver,
  GraphQLAbstractType,
} from "graphql";

function generateTypeResolver(abstractType: GraphQLAbstractType, schema: GraphQLSchema): GraphQLTypeResolver<any, any> {
  if (abstractType.resolveType) {
    return async (...args) => {
      const detectedType = await abstractType.resolveType!(...args);
      if (detectedType instanceof GraphQLObjectType) {
        return detectedType.name;
      }
      return detectedType;
    };
  }

  const possibleObjectTypes = schema.getPossibleTypes(abstractType);
  return async (source, context, info) => {
    for (const objectType of possibleObjectTypes) {
      if (objectType.isTypeOf && (await objectType.isTypeOf(source, context, info))) {
        return objectType.name;
      }
    }
    return null;
  };
}

function generateFieldsResolvers(fields: GraphQLFieldMap<any, any>): ResolverObject {
  return Object.keys(fields).reduce<ResolverObject>((fieldsMap, fieldName) => {
    const field = fields[fieldName];
    if (field.subscribe) {
      fieldsMap[fieldName] = {
        subscribe: field.subscribe,
        resolve: field.resolve,
      };
    } else if (field.resolve) {
      fieldsMap[fieldName] = field.resolve;
    }
    return fieldsMap;
  }, {});
}

export function createResolversMap(schema: GraphQLSchema): ResolversMap {
  const typeMap = schema.getTypeMap();
  return Object.keys(typeMap)
    .filter(typeName => !typeName.includes("__"))
    .reduce<ResolversMap>((resolversMap, typeName) => {
      const type = typeMap[typeName];
      if (type instanceof GraphQLObjectType) {
        resolversMap[typeName] = {
          ...(type.isTypeOf && {
            __isTypeOf: type.isTypeOf,
          }),
          ...generateFieldsResolvers(type.getFields()),
        };
      }
      if (type instanceof GraphQLInterfaceType) {
        resolversMap[typeName] = {
          __resolveType: generateTypeResolver(type, schema),
          ...generateFieldsResolvers(type.getFields()),
        };
      }
      if (type instanceof GraphQLScalarType) {
        resolversMap[typeName] = type;
      }
      if (type instanceof GraphQLEnumType) {
        const enumValues = type.getValues();
        resolversMap[typeName] = enumValues.reduce<EnumResolver>((enumMap, { name, value }) => {
          enumMap[name] = value;
          return enumMap;
        }, {});
      }
      if (type instanceof GraphQLUnionType) {
        resolversMap[typeName] = {
          __resolveType: generateTypeResolver(type, schema),
        };
      }
      return resolversMap;
    }, {});
}

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, "skipCheck">,
  referenceResolvers?: GraphQLResolverMap<any>
) {
  const schema = await buildSchema({
    ...options,
    directives: [...specifiedDirectives, ...federationDirectives, ...(options.directives || [])],
    skipCheck: true,
  });

  const federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
}
