import { CreateLogger, Logger } from "@lazy-graphql/shared";
import Configuration from "./configuration";

const logger: Logger = CreateLogger("GATEWAY", Configuration.LOG_LEVEL);

export { Logger };
export default logger;
