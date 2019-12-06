import { CreateLogger, Logger } from "@lazy-graphql/shared";
import Configuration from "./configuration";

const logger: Logger = CreateLogger("LEARNING", Configuration.LOG_LEVEL);

export default logger;
