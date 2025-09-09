import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env.config";
import AppError from "../utils/AppError";
import User from "../models/user.model";

export function auth(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    // if no argument is provided, it means that all logged in users can access it.
    if (roles.length === 0) {
      if (!accessToken) {
        return res.status(401).send({ message: "Forbidden access." });
      }
      try {
        const decoded = jwt.verify(accessToken, envVars.JWT_SECRET);
        const email = (decoded as JwtPayload).email;
        const user = await User.findOne({ email });
        const userObject = user?.toObject();
        delete userObject?.loginVerification;
        (req as any).user = userObject;
        next();
      } catch (err: any) {
        throw new AppError(401, err.message || "Forbidden access.");
      }
    } else {
      // Only selected users can access.
      try {
        const decoded = jwt.verify(
          accessToken,
          envVars.JWT_SECRET
        ) as JwtPayload;
        const email = decoded.email;
        if (!roles.includes(decoded?.role as string)) {
          throw new AppError(401, "Forbidden access.");
        }
        const user = await User.findOne({ email });
        const userObject = user?.toObject();
        delete userObject?.loginVerification;
        (req as any).user = userObject;
        next();
      } catch (err: any) {
        throw new AppError(401, err.message || "Forbidden access.");
      }
    }
  };
}
