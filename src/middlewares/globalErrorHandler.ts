import { NextFunction, Request, Response } from "express";

import { MongooseError } from "mongoose";
import envVars from "../config/env.config";
import AppError from "../utils/AppError";

export function globalErrorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const isMongooseError = error instanceof MongooseError;
  let message = "Something went wrong";
  let statusCode = 500;
  if (envVars.NODE_ENV === "development") {
    console.log(error);
  }
  let stack: any = [];
  if (error instanceof AppError) {
    message = error.message;
    statusCode = error.statusCode;
  } else if (isMongooseError) {
    stack = error.stack;
    if (error.name === "ValidationError") {
      error.message = error.message;
    }
  }
  response.status(statusCode).send({
    success: false,
    message,
  });
}
