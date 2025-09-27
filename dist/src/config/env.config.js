"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnvVars = [
    "MONGO_URI",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "SALT_ROUND",
    "CLIENT_ORIGIN",
    "EMAIL",
    "EMAIL_APP_PASS",
    "PUBLIC_VAPID_KEY",
    "PRIVATE_VAPID_KEY",
];
requiredEnvVars.map((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing env variable: ${key}`);
    }
});
exports.envVars = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    SALT_ROUND: Number(process.env.SALT_ROUND),
    EMAIL: process.env.EMAIL,
    EMAIL_APP_PASS: process.env.EMAIL_APP_PASS,
    PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY,
};
exports.default = exports.envVars;
