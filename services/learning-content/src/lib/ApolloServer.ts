import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer } from "apollo-server-fastify";

import { learningContentTypeDefs, learningContentResolvers } from "../features/learning-content";

export const apolloServer = new ApolloServer({
  schema: buildFederatedSchema([{ resolvers: learningContentResolvers, typeDefs: learningContentTypeDefs }]),
});
