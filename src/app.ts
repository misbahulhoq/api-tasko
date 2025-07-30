import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import envVars from "./config/env.config";
import dbConnect from "./config/db.config";
import { globalErrorHandler } from "./utils/globalErrorHandler";

const app = express();
dbConnect();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: envVars.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());

// error handler middleware, it should be the last middleware
app.use(globalErrorHandler);

export default app;
