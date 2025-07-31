import User, { IUser } from "../models/user.model";
import AppError from "../utils/AppError";
import { sendVerificationEmail } from "../utils/emailService";
import generateVerificationCode from "../utils/generateRandomCode";

type SignUpInput = Pick<IUser, "fullName" | "email" | "password">;

export const signUpUser = async (userData: SignUpInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(409, "Email is already registered.");
  }

  const newUser = new User({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
  });
  await newUser.save();

  return newUser;
};

export const verifyUserAccount = async (
  email: string,
  code: string
): Promise<void> => {
  const user = await User.findOne({
    "loginVerification.code": code,
    email,
  });

  if (!user) {
    throw new AppError(400, "Invalid verification code.");
  }

  if (user.loginVerification && user.loginVerification?.expires < new Date()) {
    throw new AppError(400, "Verification code has expired.");
  }

  if (user.loginVerification?.code !== code) {
    throw new AppError(400, "Invalid verification code.");
  }

  // 3. If the code is valid and not expired, update the user
  user.isVerified = true;
  await user.save();
};
