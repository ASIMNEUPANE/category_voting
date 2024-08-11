// middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "./ErrorHandler"; // Adjust the path to your error handler

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validate request body
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // Send validation error response
        const errors = err.errors.map((e) => ({
          path: e.path,
          message: e.message,
        }));
        next(new AppError("Validation failed" + errors, 400));
      } else {
        // Pass other errors to error handler
        next(err);
      }
    }
  };
};
