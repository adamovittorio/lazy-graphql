import "reflect-metadata";
import path from "path";
import { Server } from "@lazy-graphql/shared";

import { ApolloServer } from "apollo-server-fastify";

import Configuration from "./lib/configuration";
import { buildFederatedSchema } from "./lib/type-graphql-federation";

import LearningContent from "./features/learning-content/learning-content.type";
import LearningContentResolver from "./features/learning-content/learning-content.resolver";
import User from "./features/user/user.type";
import UserResolver from "./features/user/user.resolver";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;

async function bootstrap() {
  const schema = await buildFederatedSchema({
    resolvers: [LearningContentResolver, UserResolver],
    orphanedTypes: [LearningContent, User],
    emitSchemaFile: path.resolve(__dirname, "../schema.graphql"),
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const server = new Server(SERVER_PORT, SERVER_ADDRESS, apolloServer);

  await server.start();
  server.log.info("📚 Graphql Learning Content Service started");
}

bootstrap();
