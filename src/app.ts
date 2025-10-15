import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import envVars from "./config/env.config";
import connectDb from "./config/db.config";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { routes } from "./routes";
import { swaggerSpec, swaggerUi } from "../swagger.config";

const app = express();
connectDb();

let origin;

if (process.env.NODE_ENV === "development") {
  origin = "http://localhost:3000";
} else {
  origin = envVars.CLIENT_ORIGIN;
}

// middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use("/api/v1", routes);

// error handler middleware, it should be the last middleware
app.use(globalErrorHandler);

export default app;
