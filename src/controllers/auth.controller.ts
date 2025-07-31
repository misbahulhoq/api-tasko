import { Request, Response } from "express";
import { signUpUser, verifyLoginCode } from "../services/auth.service";
import sendResponse from "../utils/sendResponse";
import User from "../models/user.model";
import AppError from "../utils/AppError";

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
  res.cookie("email", newUser.email, { httpOnly: true, sameSite: "none" });
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
    throw new AppError(404, "Provide an email address.");
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

const verifyLoginController = async (req: Request, res: Response) => {
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
  await verifyLoginCode(email, code);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account verified successfully.",
    data: null,
  });
  res.redirect("/login");
};

export const AuthControllers = {
  signUpController,
  verifyLoginController,
  sendUsersEmail,
};
