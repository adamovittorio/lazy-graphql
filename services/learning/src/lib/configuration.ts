import { getNumberFromEnv, getEnvOrThrow, createConfiguration } from "@lazy-graphql/shared";

export interface Configuration {
  SERVER_PORT: number;
  SERVER_ADDRESS: string;
  LOG_LEVEL: string;
  LEARN_API_URL: string;
}

const serviceConfiguration: Configuration = {
  SERVER_PORT: getNumberFromEnv("SERVER_PORT"),
  SERVER_ADDRESS: getEnvOrThrow("SERVER_ADDRESS"),
  LOG_LEVEL: getEnvOrThrow("LOG_LEVEL"),
  LEARN_API_URL: getEnvOrThrow("LEARN_API_URL"),
};

export default createConfiguration<Configuration>(serviceConfiguration);
