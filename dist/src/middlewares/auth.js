"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const user_model_1 = __importDefault(require("../models/user.model"));
function auth(...roles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = req.cookies.accessToken;
            // ✅ Case 1: No token found
            if (!accessToken) {
                throw new AppError_1.default(401, "Authentication token is required");
            }
            // ✅ Verify JWT
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(accessToken, env_config_1.default.JWT_SECRET);
            }
            catch (err) {
                // Log exact reason internally, but don’t leak to client
                // console.error("JWT verification failed:", err?.message);
                throw new AppError_1.default(401, "Invalid or expired token");
            }
            // ✅ Check role (if roles are provided)
            if (roles.length > 0 && !roles.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
                throw new AppError_1.default(403, "Forbidden access");
            }
            // ✅ Fetch user from DB
            const email = decoded.email;
            const user = yield user_model_1.default.findOne({ email }).lean();
            if (!user) {
                throw new AppError_1.default(401, "Invalid or expired token");
            }
            delete user.loginVerification;
            req.user = user;
            next();
        }
        catch (err) {
            // ✅ Catch any unexpected errors
            console.error("Auth middleware error:", err);
            throw new AppError_1.default(401, (err === null || err === void 0 ? void 0 : err.message) || "Internal server error");
        }
    });
}
