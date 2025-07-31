import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envVars from "../config/env.config";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.redirect("/login");
  }
  try {
    jwt.verify(accessToken, envVars.JWT_SECRET);
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

export default verifyUser;
