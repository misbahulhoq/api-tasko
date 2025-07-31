import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import envVars from "../config/env.config";
import generateVerificationCode from "../utils/generateRandomCode";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;
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
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
