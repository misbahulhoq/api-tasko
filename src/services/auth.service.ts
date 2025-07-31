import User, { IUser } from "../models/user.model";
import AppError from "../utils/AppError";
import { sendVerificationEmail } from "../utils/emailService";

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
  if (newUser.signupVerification?.code)
    sendVerificationEmail(userData.email, newUser.signupVerification.code);

  return newUser;
};

export const verifyUserAccount = async (
  email: string,
  code: string
): Promise<void> => {
  const user = await User.findOne({
    "signupVerification.code": code,
    email,
  });

  if (!user) {
    throw new AppError(400, "Invalid verification code.");
  }

  if (!user.signupVerification) {
    throw new AppError(
      400,
      "No verification code found. Please request a new one."
    );
  }

  if (user.signupVerification.expires < new Date()) {
    throw new AppError(
      400,
      "Verification code has expired. Please request a new one."
    );
  }

  if (user.signupVerification.code !== code) {
    throw new AppError(400, "Invalid verification code.");
  }

  // 3. If the code is valid and not expired, update the user
  user.isVerified = true;
  user.signupVerification = undefined; // Clear the verification data
  await user.save();
};
