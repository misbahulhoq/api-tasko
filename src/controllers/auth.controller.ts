import { Request, Response } from "express";
import { signUpUser, verifyUserAccount } from "../services/auth.service";
import sendResponse from "../utils/sendResponse";

const signUpController = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Full name, email, and password are required." });
  }

  const user = await signUpUser({ fullName, email, password });
  res.cookie("email", user.email, { httpOnly: true });

  sendResponse(res, 201, user);
};

const verifyAccountController = async (req: Request, res: Response) => {
  const { code } = req.body;
  const email = req.cookies.email;
  if (!email || !code) {
    return sendResponse(res, 400, {
      message: "Email and verification code are required.",
    });
  }
  await verifyUserAccount(email, code);
  return sendResponse(res, 200, {
    message: "Account verified successfully.",
  });
};

export const AuthControllers = {
  signUpController,
  verifyAccountController,
};
