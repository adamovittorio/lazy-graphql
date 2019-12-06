import { CreateLogger, Logger } from "@lazy-graphql/shared";
import Configuration from "./configuration";

const loggerFactory: Logger = CreateLogger("LEARNING", Configuration.LOG_LEVEL);

export { Logger };
export default loggerFactory;
