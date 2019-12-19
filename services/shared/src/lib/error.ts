import { Logger } from "./logger";
export class ErrorHandler {
  constructor(private logger: Logger) {
    process.on("unhandledRejection", (reason: string) => {
      // I just caught an unhandled promise rejection,
      // since we already have fallback handler for unhandled errors (see below),
      // let throw and let him handle that
      throw reason;
    });

    process.on("uncaughtException", (error: Error) => {
      this.handleError(error);
      if (!this.isOperational(error)) {
        process.exit(1);
      }
    });
  }

  // Every AppError should pass here
  public async handleError(e: Partial<AppError>): Promise<void> {
    this.logger.error(e);
    // here we can send alerts, redact errors and more
  }

  isOperational(e: Partial<AppError>) {
    return e.isOperational;
  }
}

export class AppError extends Error {
  public readonly name: string;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(name = "AppError", message: string, code?: string, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string) {
    super("ConfigurationError", message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class HTTPError extends AppError {
  constructor(message: string, code?: string) {
    super("HTTPError", message), code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
