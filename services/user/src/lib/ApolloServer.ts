import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer } from "apollo-server-fastify";

import { playerResolver, playerTypeDefs } from "../features/player";

export const apolloServer = new ApolloServer({
  schema: buildFederatedSchema([{ resolvers: playerResolver, typeDefs: playerTypeDefs }]),
});
