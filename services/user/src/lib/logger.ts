import { CreateLogger, Logger } from "@lazy-graphql/shared";
import Configuration from "./configuration";

const logger: Logger = CreateLogger("USER", Configuration.LOG_LEVEL);

export default logger;
