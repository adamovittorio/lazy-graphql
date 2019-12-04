import "reflect-metadata";
import path from "path";
import { Server } from "@lazy-graphql/shared";

import { ApolloServer } from "apollo-server-fastify";

import Configuration from "./lib/configuration";
import { buildFederatedSchema } from "./lib/type-graphql-federation";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;

async function bootstrap() {
  const schema = await buildFederatedSchema({
    resolvers: [__dirname + "/features/**/*.resolver.ts"],
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
