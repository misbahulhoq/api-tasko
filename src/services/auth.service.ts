import User, { IUser } from "../models/user.model";
import AppError from "../utils/AppError";
import { sendVerificationEmail } from "../utils/email.validator";
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

export const login = async (email: string, password: string): Promise<void> => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(404, "Invalid credentials.");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid credentials.");
  }

  const verificationCode = generateVerificationCode();
  user.loginVerification = {
    code: verificationCode,
    expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  };
  await user.save();
  await sendVerificationEmail(email, verificationCode);
};

export const generateNewVerificationCode = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  const verificationCode = generateVerificationCode();
  user.loginVerification = {
    code: verificationCode,
    expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  };
  await user.save();
  await sendVerificationEmail(email, verificationCode);
};

export const verifyLoginCode = async (
  email: string,
  code: string
): Promise<IUser> => {
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
  return user;
};

export const getUserInfo = async (email: string): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  return user;
};
