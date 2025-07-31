import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  generateNewVerificationCode,
  login,
  signUpUser,
  verifyLoginCode,
} from "../services/auth.service";
import sendResponse from "../utils/sendResponse";
import User from "../models/user.model";
import AppError from "../utils/AppError";
import envVars from "../config/env.config";

const signUpController = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Full name, email, and password are required." });
  }

  const newUser = await signUpUser({ fullName, email, password });
  const user = {
    _id: newUser._id,
    fullName: newUser.fullName,
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

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, {
      message: "Email and password are required.",
      success: false,
      data: null,
      statusCode: 400,
    });
  }

  await login(email, password);
  res.cookie("email", email, { httpOnly: true, sameSite: "lax" });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful. Redirecting to veficiation page..",
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
  await generateNewVerificationCode(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Verification code sent.",
    data: null,
  });
};

const verifyLoginCodeController = async (req: Request, res: Response) => {
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
  const user = await verifyLoginCode(email, code);
  const token = jwt.sign(
    { email: user.email, _id: user._id },
    envVars.JWT_SECRET
  );
  res.cookie("accessToken", token, { httpOnly: true, sameSite: "lax" });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login verified. Redirecting to dashboard.",
    data: null,
  });
};

export const AuthControllers = {
  signUpController,
  verifyLoginCodeController,
  sendUsersEmail,
  loginController,
  getNewVerificationCode,
};
