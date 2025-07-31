import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import envVars from "./config/env.config";
import dbConnect from "./config/db.config";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { routes } from "./routes";

const app = express();
dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(helmet());
app.use("/api/v1", routes);

// error handler middleware, it should be the last middleware
app.use(globalErrorHandler);

export default app;
