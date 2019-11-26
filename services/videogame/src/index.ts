import { Server } from "@lazy-graphql/shared";

const server = new Server(4001, "::");

server.start();
server.log.info("🕹 Graphql  Videogame Service started");
