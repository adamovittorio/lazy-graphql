import { Server } from "@lazy-graphql/shared";
import Configuration from "./lib/Configuration";

const { SERVER_ADDRESS, SERVER_PORT } = Configuration;

const server = new Server(SERVER_PORT, SERVER_ADDRESS);

server.start();
server.log.info("🕹 Graphql  Videogame Service started");
