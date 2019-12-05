import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-fastify";

import { Server } from "@lazy-graphql/shared";
import Configuration from "./lib/configuration";

const { SERVER_PORT, SERVER_ADDRESS, USER_SERVICE_URL, LEARNING_SERVICE_URL } = Configuration;

const gateway = new ApolloGateway({
  serviceList: [
    { name: "user", url: USER_SERVICE_URL },
    { name: "learning", url: LEARNING_SERVICE_URL },
  ],
});

const apolloServer = new ApolloServer({
  gateway,
  subscriptions: false,
});

const server = new Server(SERVER_PORT, SERVER_ADDRESS, apolloServer);

server.start();
server.log.info("⚡️ Graphql Gateway Service started");
