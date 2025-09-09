import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  NODE_ENV: "development" | "production";
  PORT?: number | string;
  CLIENT_ORIGIN: string;
  SALT_ROUND: number;
  EMAIL: string;
  EMAIL_APP_PASS: string;
}

const requiredEnvVars: (keyof EnvConfig)[] = [
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "SALT_ROUND",
  "CLIENT_ORIGIN",
  "EMAIL",
  "EMAIL_APP_PASS",
];

requiredEnvVars.map((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
});

export const envVars: EnvConfig = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  PORT: process.env.PORT,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  SALT_ROUND: Number(process.env.SALT_ROUND),
  EMAIL: process.env.EMAIL as string,
  EMAIL_APP_PASS: process.env.EMAIL_APP_PASS as string,
};

export default envVars;
