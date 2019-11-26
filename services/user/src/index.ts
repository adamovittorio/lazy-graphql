import { Server } from "@lazy-graphql/shared";

const server = new Server(4002, "::");

server.start();

server.log.info("🧟‍♀️ Graphql User Service started!");
