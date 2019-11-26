import { Server } from "@lazy-graphql/shared";

const server = new Server(4000, "::");

server.start();
server.log.info("⚡️ Graphql Gateway Service started");
