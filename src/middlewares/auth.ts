import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env.config";
import AppError from "../utils/AppError";
import User from "../models/user.model";

export function auth(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;

      // ✅ Case 1: No token found
      if (!accessToken) {
        return next(new AppError(401, "Authentication token is required"));
      }

      // ✅ Verify JWT
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(accessToken, envVars.JWT_SECRET) as JwtPayload;
      } catch (err: any) {
        // Log exact reason internally, but don’t leak to client
        console.error("JWT verification failed:", err?.message);
        return next(new AppError(401, "Invalid or expired token"));
      }

      // ✅ Check role (if roles are provided)
      if (roles.length > 0 && !roles.includes(decoded?.role as string)) {
        return next(new AppError(403, "Forbidden access"));
      }

      // ✅ Fetch user from DB
      const email = decoded.email;
      const user = await User.findOne({ email });

      if (!user) {
        return next(new AppError(401, "Invalid or expired token"));
      }

      const userObject = user.toObject();
      delete userObject.loginVerification;

      (req as any).user = userObject;

      next();
    } catch (err) {
      // ✅ Catch any unexpected errors
      console.error("Auth middleware error:", err);
      next(new AppError(500, "Internal server error"));
    }
  };
}
