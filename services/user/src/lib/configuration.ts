import { getNumberFromEnv, getEnvOrThrow, createConfiguration } from "@lazy-graphql/shared";

export interface Configuration {
  SERVER_PORT: number;
  SERVER_ADDRESS: string;
}

const serviceConfiguration: Configuration = {
  SERVER_PORT: getNumberFromEnv("SERVER_PORT"),
  SERVER_ADDRESS: getEnvOrThrow("SERVER_ADDRESS"),
};

export default createConfiguration<Configuration>(serviceConfiguration);
