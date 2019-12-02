import { getNumberFromEnv, getEnvOrThrow, createConfiguration } from "@lazy-graphql/shared";

export interface Configuration {
  SERVER_PORT: number;
  SERVER_ADDRESS: string;
  USER_SERVICE_URL: string;
  VIDEOGAME_SERVICE_URL: string;
}

const serviceConfiguration: Configuration = {
  SERVER_PORT: getNumberFromEnv("SERVER_PORT"),
  SERVER_ADDRESS: getEnvOrThrow("SERVER_ADDRESS"),
  USER_SERVICE_URL: getEnvOrThrow("USER_SERVICE_URL"),
  VIDEOGAME_SERVICE_URL: getEnvOrThrow("VIDEOGAME_SERVICE_URL"),
};

export default createConfiguration<Configuration>(serviceConfiguration);
