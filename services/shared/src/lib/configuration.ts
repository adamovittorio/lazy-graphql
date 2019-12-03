import { ConfigurationError } from "./error";

export const getEnvOrThrow = (key: string): string => {
  const value = process.env[key] ?? undefined;
  if (value) {
    return value;
  }

  throw new ConfigurationError(`${key} not found in process.env`);
};

export const getBooleanFromEnv = (key: string): boolean => {
  const raw = getEnvOrThrow(key);
  const isABoolean = ["true", "false"].includes(raw);
  if (!isABoolean) {
    throw new ConfigurationError(`process.env.${key} is not a boolean`);
  }
  return raw === "true" ? true : false;
};

export const getNumberFromEnv = (key: string): number => {
  const raw = getEnvOrThrow(key);

  const parsed = parseInt(raw, 10);

  if (isNaN(parsed)) {
    throw new ConfigurationError(`process.env.${key} is not a number`);
  }

  return parsed;
};

export const createConfiguration = <T extends object>(configuration: T): T => {
  return new Proxy(configuration, {
    set: function(_object, property) {
      throw new Error(`configuration.${String(property)} cannot be mutate!`);
    },
  });
};
