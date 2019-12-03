import "reflect-metadata";
import path from "path";
import { Server } from "@lazy-graphql/shared";

import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-fastify";

import Configuration from "./lib/configuration";
import PlayerResolver from "./features/player/resolver";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PlayerResolver],
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
