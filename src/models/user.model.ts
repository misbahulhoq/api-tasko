import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import envVars from "../config/env.config";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;
  signupVerification?: {
    code: string;
    expires: Date;
  };
  loginVerification?: {
    code: string;
    expires: Date;
  };
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    signupVerification: new Schema(
      {
        code: { type: String, required: false },
        expires: { type: Date, default: Date.now() + 5 * 60 * 1000 },
      },
      {
        _id: false,
      }
    ),
    loginVerification: new Schema(
      {
        code: { type: String, required: false },
        expires: {
          type: Date,
          default: () => new Date(Date.now() + 5 * 60 * 1000),
        },
      },
      { _id: false }
    ),
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  // Hash password only if it has been modified (or is new)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, envVars.SALT_ROUND);
  }

  // Generate signup verification code only for a new user
  if (this.isNew) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    this.signupVerification = {
      code: verificationCode,
      expires: new Date(Date.now() + 5 * 60 * 1000), // Code expires in 5 minutes
    };
  }

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
