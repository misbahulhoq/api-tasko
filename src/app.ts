import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import envVars from "./config/env.config";
import dbConnect from "./config/db.config";

const app = express();

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

dbConnect();

export default app;
