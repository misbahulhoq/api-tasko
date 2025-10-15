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
exports.AuthControllers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_model_1 = __importDefault(require("../models/user.model"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const env_config_1 = __importDefault(require("../config/env.config"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield auth_service_1.default.signup(req.body);
    const user = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified,
    };
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Signup successful. Redirecting to login page..",
        data: user,
    });
});
const sendUsersEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.cookies.email;
    if (!email) {
        throw new AppError_1.default(400, "Provide an email address.");
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found.");
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "user email sent.",
        data: { email: user.email },
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.default.login(req.body);
    res.cookie("email", user.email, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 5 * 60 * 1000, // 5 minutes
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Login successful. Redirecting to verification page..",
        data: null,
    });
});
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.clearCookie("email", { httpOnly: true, sameSite: "none", secure: true });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Logout successful",
        statusCode: 200,
        data: null,
    });
});
const getNewVerificationCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.cookies.email;
    if (!email) {
        return (0, sendResponse_1.default)(res, {
            message: "Email is required.",
            success: false,
            data: null,
            statusCode: 400,
        });
    }
    yield auth_service_1.default.generateNewVerificationCode(email);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Verification code sent.",
        data: null,
    });
});
const verifyLoginCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const email = req.cookies.email;
    if (!email || !code) {
        return (0, sendResponse_1.default)(res, {
            message: "Email and verification code are required.",
            success: false,
            data: null,
            statusCode: 400,
        });
    }
    const user = yield auth_service_1.default.verifyLoginCode(email, code);
    const token = jsonwebtoken_1.default.sign({ email: user.email, _id: user._id, role: user.role }, env_config_1.default.JWT_SECRET);
    res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.clearCookie("email", { httpOnly: true, sameSite: "none", secure: true });
    res.cookie("email", user.email, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Login verified. Redirecting to dashboard.",
        data: user,
    });
});
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User info fetched.",
        data: user,
    });
});
const sendOtpInTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = req.body;
    const user = yield auth_service_1.default.sendOtpInTest(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "OTP sent successfully",
        statusCode: 200,
        data: { code: (_a = user.loginVerification) === null || _a === void 0 ? void 0 : _a.code },
    });
});
exports.AuthControllers = {
    signup,
    verifyLoginCode,
    sendUsersEmail,
    login,
    logout,
    getNewVerificationCode,
    getUserInfo,
    sendOtpInTest,
};
