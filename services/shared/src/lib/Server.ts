import fastify, { FastifyInstance, Logger } from "fastify";

import compress from "fastify-compress";
import helmet from "fastify-helmet";
import cors from "fastify-cors";

export class Server {
  fastifyIstance: FastifyInstance;
  log: Logger;

  constructor(private port: number, private address: string) {
    this.fastifyIstance = fastify({
      logger: {
        prettyPrint: {
          colorize: true,
          ignore: "pid,hostname",
        },
      },
    });

    this.log = this.fastifyIstance.log;

    this.fastifyIstance.register(cors);
    this.fastifyIstance.register(helmet);
    this.fastifyIstance.register(compress);
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
