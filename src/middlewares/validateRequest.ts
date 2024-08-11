import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // For POST and PUT requests
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid request data',
          details: error.errors,
        });
      }
      next(error);
    }
  };
};

export default validateRequest;
