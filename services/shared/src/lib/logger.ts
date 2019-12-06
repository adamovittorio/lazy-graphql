import pino from "pino";

export const CreateLogger = (name: string, level: string): Logger =>
  pino({
    name,
    level,
  });

export type Logger = pino.Logger;
