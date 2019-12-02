import { Server } from "@lazy-graphql/shared";

import Configuration from "./lib/Configuration";
import { apolloServer } from "./lib/ApolloServer";

const { SERVER_PORT, SERVER_ADDRESS } = Configuration;

const server = new Server(SERVER_PORT, SERVER_ADDRESS, apolloServer);

server.start();
server.log.info("🧟‍♀️ Graphql User Service started!");
