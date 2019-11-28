import fastify, { FastifyInstance, Logger, Plugin } from "fastify";

import compress from "fastify-compress";
import helmet from "fastify-helmet";
import cors from "fastify-cors";

interface MockApolloServer {
  createHandler: () => Plugin<{}, {}, {}, {}>;
}

export class Server {
  fastifyIstance: FastifyInstance;
  log: Logger;

  constructor(private port: number, private address: string, apolloServer?: MockApolloServer) {
    this.fastifyIstance = fastify({ logger: true });

    this.log = this.fastifyIstance.log;

    this.fastifyIstance.register(cors);
    this.fastifyIstance.register(helmet);
    this.fastifyIstance.register(compress);
    this.registerApolloServer(apolloServer);
  }

  private registerApolloServer(apolloServer?: MockApolloServer) {
    if (apolloServer) {
      this.fastifyIstance.register(apolloServer.createHandler());
    }
  }

  async start() {
    try {
      await this.fastifyIstance.listen(this.port, this.address);
    } catch (err) {
      this.fastifyIstance.log.error(err);
      process.exit(1);
    }
  }
}
