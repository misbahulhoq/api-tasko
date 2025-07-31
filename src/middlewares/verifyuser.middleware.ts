import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envVars from "../config/env.config";
import AppError from "../utils/AppError";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw new AppError(401, "Unauthorized");
  }
  try {
    jwt.verify(accessToken, envVars.JWT_SECRET);
    next();
  } catch (error) {
    // @ts-ignore
    throw new AppError(401, error.message);
  }
};

export default verifyUser;
