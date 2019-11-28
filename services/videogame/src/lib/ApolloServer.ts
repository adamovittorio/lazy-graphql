import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer } from "apollo-server-fastify";

import { videogameTypeDefs, videogameResolvers } from "../features/videogame";

export const apolloServer = new ApolloServer({
  schema: buildFederatedSchema([{ resolvers: videogameResolvers, typeDefs: videogameTypeDefs }]),
});
