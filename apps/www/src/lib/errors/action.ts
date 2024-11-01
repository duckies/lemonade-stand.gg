import type { GenericSchema, InferIssue } from "valibot";

export const ActionErrorCodes = [
  "BAD_REQUEST",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "TIMEOUT",
  "CONFLICT",
  "PRECONDITION_FAILED",
  "PAYLOAD_TOO_LARGE",
  "UNSUPPORTED_MEDIA_TYPE",
  "UNPROCESSABLE_CONTENT",
  "TOO_MANY_REQUESTS",
  "CLIENT_CLOSED_REQUEST",
  "INTERNAL_SERVER_ERROR",
] as const;

export type ActionErrorCode = (typeof ActionErrorCodes)[number];

interface ActionErrorOptions {
  message?: string;
  code: ActionErrorCode;
}

export class ActionError<_TInput extends GenericSchema = GenericSchema> extends Error {
  public readonly code: ActionErrorCode;

  constructor({ message, code }: ActionErrorOptions, options?: ErrorOptions) {
    super(message, options);

    this.code = code;
    this.name = "ActionError";
  }

  public toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
    };
  }
}

export class ActionInputError<T extends GenericSchema> extends ActionError {
  public readonly issues: [InferIssue<T>, ...InferIssue<T>[]];

  constructor(issues: [InferIssue<T>, ...InferIssue<T>[]]) {
    super({
      code: "BAD_REQUEST",
      message: "Failed to validate input.",
    });

    this.name = "ActionInputError";
    this.issues = issues;
  }

  public override toJSON() {
    return {
      ...super.toJSON(),
      issues: this.issues,
    };
  }
}

export function isActionError(error: unknown): error is ActionError {
  return (
    typeof error === "object" && error != null && "name" in error && error.name === "ActionError"
  );
}

export function isInputError<T extends GenericSchema>(
  error?: ActionError<T>,
): error is ActionInputError<T>;
export function isInputError(error?: unknown): error is ActionInputError<GenericSchema>;
export function isInputError<T extends GenericSchema>(
  error?: unknown | ActionError<T>,
): error is ActionInputError<T> {
  return (
    typeof error === "object" &&
    error != null &&
    "name" in error &&
    error.name === "ActionInputError" &&
    "issues" in error &&
    Array.isArray(error.issues)
  );
}
