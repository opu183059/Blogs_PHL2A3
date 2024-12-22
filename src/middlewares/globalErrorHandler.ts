import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const handlerZodError = (err: any, res: Response) => {
  const issues = err.issues.map((item: any) => {
    return {
      path: item.path.join(">"),
      message: item.message,
    };
  });

  res.status(400).json({
    success: false,
    message: err.message,
    issues: issues,
    error: err,
  });
};

const handleValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      name: item.name,
      path: item.path,
      message: item.message,
    };
  });

  res.status(400).json({
    success: false,
    message: err.message,
    issues: issues,
    error: err,
  });
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name && err.name === "ZodError") {
    handlerZodError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  }
};
