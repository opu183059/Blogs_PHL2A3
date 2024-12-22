import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
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
    // message: err.message,
    message: err.message,
    statusCode: httpStatus.BAD_REQUEST,
    error: err,
    stack: err?.stack,
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
    statusCode: httpStatus.BAD_REQUEST,
    error: err,
    stack: err?.stack,
  });
};

const handleCastError = (err: any, res: Response) => {
  res.status(400).json({
    success: false,
    message: err.message,
    statusCode: httpStatus.BAD_REQUEST,
    error: err,
    stack: err?.stack,
  });
};

const handlerDuplicateError = (err: any, res: Response) => {
  res.status(httpStatus.CONFLICT).json({
    status: false,
    message: err.message,
    statusCode: httpStatus.CONFLICT,
    error: err,
    stack: err?.stack,
  });
};

const handleGenericError = (err: any, res: Response) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    error: err,
    stack: err?.stack,
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
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handlerDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
