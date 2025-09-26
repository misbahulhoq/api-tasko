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
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("../config/env.config"));
const AppError_1 = __importDefault(require("./AppError"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: env_config_1.default.EMAIL,
        pass: env_config_1.default.EMAIL_APP_PASS,
    },
});
const sendVerificationEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: `"Tasko" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: "Verify Your Login ✔",
        html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>Welcome!</h2>
        <p>Thank you for loging into Tasko. Please use the following code to verify your account. The code is valid for 5 minutes.</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background: #f0f0f0; padding: 10px 20px; border-radius: 5px;">
          ${code}
        </p>
        <p style="font-size: 14px; color: #777;">
          <em>This code is valid for 5 minutes.</em>
        </p>
      </div>
    `,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully.");
    }
    catch (error) {
        console.error("Error sending verification email:", error);
        const errorMessage = error && typeof error === "object" && "message" in error
            ? error.message
            : "Could not send verification email.";
        throw new AppError_1.default(500, errorMessage || "Could not send verification email.");
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
