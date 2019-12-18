import { AppError } from "@lazy-graphql/shared";

export enum LearnAPIErrorCodes {
  GET_LEARNING_CONTENT = "GET_LEARNING_CONTENT",
}

export class LearnAPIError extends AppError {
  constructor(message: string, code: LearnAPIErrorCodes) {
    super("LearnAPIError", message, String(code));
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
