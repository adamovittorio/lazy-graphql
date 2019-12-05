import "reflect-metadata";
import path from "path";
import { Server } from "@lazy-graphql/shared";

import { ApolloServer } from "apollo-server-fastify";

import Configuration from "./lib/configuration";
import UserResolver from "./features/user/schema/user.resolver";
import { buildFederatedSchema } from "./lib/type-graphql-federation";
import User from "./features/user/schema/user.type";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;

async function bootstrap() {
  const schema = await buildFederatedSchema({
    resolvers: [UserResolver],
    orphanedTypes: [User],
    emitSchemaFile: path.resolve(__dirname, "../schema.graphql"),
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const server = new Server(SERVER_PORT, SERVER_ADDRESS, apolloServer);

  await server.start();
  server.log.info("🧟‍♀️ Graphql User Service started!");
}

bootstrap();
