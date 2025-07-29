import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  NODE_ENV: string;
  PORT: number;
  CLIENT_ORIGIN: string;
}

export const envVars: EnvConfig = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "",
  NODE_ENV: process.env.NODE_ENV || "",
  PORT: process.env.PORT as number | string as number,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};

export default envVars;
