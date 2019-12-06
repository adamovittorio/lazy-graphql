import "reflect-metadata";
import path from "path";
import Container from "typedi";
import { Server } from "@lazy-graphql/shared";

import { ApolloServer } from "apollo-server-fastify";

import logger from "./lib/logger";
import Configuration from "./lib/configuration";
import { buildFederatedSchema } from "./lib/type-graphql-federation";
import LearningContentResolver from "./features/learning-content/schema/learning-content.resolver";
import User from "./features/user/schema/user.type";
import UserResolver from "./features/user/schema/user.resolver";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;

async function bootstrap() {
  const schema = await buildFederatedSchema({
    resolvers: [LearningContentResolver, UserResolver],
    orphanedTypes: [User],
    emitSchemaFile: path.resolve(__dirname, "../schema.graphql"),
    container: Container,
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const server = new Server(SERVER_PORT, SERVER_ADDRESS, logger, apolloServer);

  await server.start();
}

bootstrap();
