import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  errors: string[];

  constructor(errors: string[]) {
    super("Validation Error", 400);
    this.errors = errors;
  }
}

const ErrorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", err);

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError ? err.message : "An unexpected error occurred";

  const response = {
    success: false,
    status: statusCode,
    message,
    ...(err instanceof ValidationError && { errors: err.errors }),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(statusCode).json(response);
};

export { ErrorHandler, AppError, ValidationError };
