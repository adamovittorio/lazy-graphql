import "reflect-metadata";
import path from "path";
import { Server, ErrorHandler } from "@lazy-graphql/shared";

import { ApolloServer } from "apollo-server-fastify";

import logger from "./lib/logger";
import Configuration from "./lib/configuration";
import UserResolver from "./features/user/schema/user.resolver";
import { buildFederatedSchema } from "./lib/type-graphql-federation";
import User from "./features/user/schema/user.type";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;
const errorHandler = new ErrorHandler(logger);

async function bootstrap() {
  const schema = await buildFederatedSchema({
    resolvers: [UserResolver],
    orphanedTypes: [User],
    emitSchemaFile: path.resolve(__dirname, "../schema.graphql"),
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: err => {
      errorHandler.handleError(err);
      return err;
    },
  });

  const server = new Server(SERVER_PORT, SERVER_ADDRESS, logger, apolloServer);

  await server.start();
}

bootstrap();
