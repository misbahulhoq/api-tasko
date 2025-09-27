"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const mongoose_1 = require("mongoose");
const env_config_1 = __importDefault(require("../config/env.config"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const zod_1 = require("zod");
function globalErrorHandler(error, request, response, next) {
    const isMongooseError = error instanceof mongoose_1.MongooseError;
    const isZodError = error instanceof zod_1.ZodError;
    let message = "Something went wrong";
    let statusCode = 500;
    let stack = [];
    if (env_config_1.default.NODE_ENV === "development") {
        console.log(error);
    }
    if (error instanceof AppError_1.default) {
        message = error.message;
        statusCode = error.statusCode;
    }
    else if (isMongooseError) {
        statusCode = 400;
        stack = error.stack;
        if (error.name === "ValidationError") {
            error.message = error.message;
        }
    }
    else if (isZodError) {
        statusCode = 400;
        stack = error.stack;
        message = error.message;
    }
    response.status(statusCode).send({
        success: false,
        statusCode,
        message,
        stack: env_config_1.default.NODE_ENV === "development" ? stack : undefined,
        data: null,
    });
}
