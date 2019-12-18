import { Logger } from "./logger";
export class ErrorHandler {
  constructor(private logger: Logger) {}
  public async handleError(e: Partial<AppError>): Promise<void> {
    this.logger.error(e);
    // here we can send allerts
    this.determineIfOperationalError(e);
  }

  determineIfOperationalError(e: Partial<AppError>) {
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
