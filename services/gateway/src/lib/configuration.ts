import { getNumberFromEnv, getEnvOrThrow, createConfiguration } from "@lazy-graphql/shared";

export interface Configuration {
  SERVER_PORT: number;
  SERVER_ADDRESS: string;
  USER_SERVICE_URL: string;
  LEARNING_SERVICE_URL: string;
  LOG_LEVEL: string;
}

const serviceConfiguration: Configuration = {
  SERVER_PORT: getNumberFromEnv("SERVER_PORT"),
  SERVER_ADDRESS: getEnvOrThrow("SERVER_ADDRESS"),
  USER_SERVICE_URL: getEnvOrThrow("USER_SERVICE_URL"),
  LEARNING_SERVICE_URL: getEnvOrThrow("LEARNING_SERVICE_URL"),
  LOG_LEVEL: getEnvOrThrow("LOG_LEVEL"),
};

export default createConfiguration<Configuration>(serviceConfiguration);
