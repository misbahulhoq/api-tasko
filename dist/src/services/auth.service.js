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
exports.AuthServices = exports.getUserInfo = exports.verifyLoginCode = exports.generateNewVerificationCode = exports.login = exports.signup = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const user_model_1 = __importDefault(require("../models/user.model"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const email_validator_1 = require("../utils/email.validator");
const generateRandomCode_1 = __importDefault(require("../utils/generateRandomCode"));
const signup = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = userData;
    if (!email || !password || !name) {
        throw new AppError_1.default(400, "Email, password and name are required.");
    }
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser) {
        throw new AppError_1.default(409, "Email is already registered.");
    }
    const newUser = new user_model_1.default({
        name,
        email,
        password,
    });
    yield newUser.save();
    return newUser;
});
exports.signup = signup;
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "User not found.");
    }
    const isPasswordValid = yield user.comparePassword(password);
    if (!isPasswordValid) {
        throw new AppError_1.default(401, "Invalid credentials.");
    }
    const verificationCode = (0, generateRandomCode_1.default)();
    user.loginVerification = {
        code: verificationCode,
        expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    };
    yield user.save();
    if (env_config_1.default.NODE_ENV !== "development")
        yield (0, email_validator_1.sendVerificationEmail)(email, verificationCode);
    return { email };
});
exports.login = login;
const generateNewVerificationCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found.");
    }
    const verificationCode = (0, generateRandomCode_1.default)();
    user.loginVerification = {
        code: verificationCode,
        expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    };
    yield user.save();
    yield (0, email_validator_1.sendVerificationEmail)(email, verificationCode);
});
exports.generateNewVerificationCode = generateNewVerificationCode;
const verifyLoginCode = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield user_model_1.default.findOne({
        "loginVerification.code": code,
        email,
    });
    if (!user) {
        throw new AppError_1.default(400, "Invalid verification code.");
    }
    if (user.loginVerification && ((_a = user.loginVerification) === null || _a === void 0 ? void 0 : _a.expires) < new Date()) {
        throw new AppError_1.default(400, "Verification code has expired.");
    }
    if (((_b = user.loginVerification) === null || _b === void 0 ? void 0 : _b.code) !== code) {
        throw new AppError_1.default(400, "Invalid verification code.");
    }
    // 3. If the code is valid and not expired, update the user
    user.isVerified = true;
    yield user.save();
    return user;
});
exports.verifyLoginCode = verifyLoginCode;
const getUserInfo = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found.");
    }
    return user;
});
exports.getUserInfo = getUserInfo;
const sendOtpInTest = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    return user;
});
exports.AuthServices = {
    login: exports.login,
    signup: exports.signup,
    verifyLoginCode: exports.verifyLoginCode,
    generateNewVerificationCode: exports.generateNewVerificationCode,
    getUserInfo: exports.getUserInfo,
    sendOtpInTest,
};
exports.default = exports.AuthServices;
