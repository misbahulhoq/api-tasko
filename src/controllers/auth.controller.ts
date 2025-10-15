import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthServices from "../services/auth.service";
import sendResponse from "../utils/sendResponse";
import User from "../models/user.model";
import AppError from "../utils/AppError";
import envVars from "../config/env.config";

const signup = async (req: Request, res: Response) => {
  const newUser = await AuthServices.signup(req.body);
  const user = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isVerified: newUser.isVerified,
  };
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Signup successful. Redirecting to login page..",
    data: user,
  });
};

const sendUsersEmail = async (req: Request, res: Response) => {
  const email = req.cookies.email;

  if (!email) {
    throw new AppError(400, "Provide an email address.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user email sent.",
    data: { email: user.email },
  });
};

const login = async (req: Request, res: Response) => {
  const user = await AuthServices.login(req.body);

  res.cookie("email", user.email, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 5 * 60 * 1000, // 5 minutes
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful. Redirecting to verificiation page..",
    data: null,
  });
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.clearCookie("email", { httpOnly: true, sameSite: "none", secure: true });
  sendResponse(res, {
    success: true,
    message: "Logout successful",
    statusCode: 200,
    data: null,
  });
};

const getNewVerificationCode = async (req: Request, res: Response) => {
  const email = req.cookies.email;
  if (!email) {
    return sendResponse(res, {
      message: "Email is required.",
      success: false,
      data: null,
      statusCode: 400,
    });
  }
  await AuthServices.generateNewVerificationCode(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Verification code sent.",
    data: null,
  });
};

const verifyLoginCode = async (req: Request, res: Response) => {
  const { code } = req.body;
  const email = req.cookies.email;
  if (!email || !code) {
    return sendResponse(res, {
      message: "Email and verification code are required.",
      success: false,
      data: null,
      statusCode: 400,
    });
  }

  const user = await AuthServices.verifyLoginCode(email, code);
  const token = jwt.sign(
    { email: user.email, _id: user._id, role: user.role },
    envVars.JWT_SECRET
  );
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
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login verified. Redirecting to dashboard.",
    data: user,
  });
};

const getUserInfo = async (req: Request, res: Response) => {
  const user = (req as any).user;
  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User info fetched.",
    data: user,
  });
};

const sendOtpInTest = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await AuthServices.sendOtpInTest(email);
  sendResponse(res, {
    success: true,
    message: "OTP sent successfully",
    statusCode: 200,
    data: { code: user.loginVerification?.code },
  });
};

export const AuthControllers = {
  signup,
  verifyLoginCode,
  sendUsersEmail,
  login,
  logout,
  getNewVerificationCode,
  getUserInfo,
  sendOtpInTest,
};
