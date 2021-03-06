import "reflect-metadata";
import path from "path";
import Container from "typedi";
import { Server, ErrorHandler } from "@lazy-graphql/shared";

import { ApolloServer } from "apollo-server-fastify";

import loggerFactory from "./lib/logger";
import Configuration from "./lib/configuration";
import { buildFederatedSchema } from "./lib/type-graphql-federation";
import LearningContentResolver from "./features/learning-content/schema/learning-content.resolver";
import User from "./features/user/schema/user.type";
import UserResolver from "./features/user/schema/user.resolver";
import logger from "./lib/logger";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;
const errorHandler = new ErrorHandler(logger);

async function bootstrap() {
  const schema = await buildFederatedSchema({
    resolvers: [LearningContentResolver, UserResolver],
    orphanedTypes: [User],
    emitSchemaFile: path.resolve(__dirname, "../schema.graphql"),
    container: Container,
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: err => {
      errorHandler.handleError(err);
      return err;
    },
  });

  const server = new Server(SERVER_PORT, SERVER_ADDRESS, loggerFactory, apolloServer);

  await server.start();
}

bootstrap();
