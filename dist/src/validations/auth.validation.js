"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidatorSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
const signup = zod_1.default.object({
    name: zod_1.default
        .string("Name is required")
        .min(3, "Name must be at least 3 characters long"),
    email: zod_1.default
        .string("Email is required")
        .min(6, "Email must be at least 6 characters long"),
    password: zod_1.default.string("Password is required.").min(6, "Password is too short."),
});
exports.AuthValidatorSchemas = { signup };
exports.default = exports.AuthValidatorSchemas;
