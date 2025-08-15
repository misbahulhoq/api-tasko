import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import envVars from "../config/env.config";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  loginVerification?: {
    code: string;
    expires: Date;
  };
  comparePassword: (password: string) => Promise<boolean>;
  generateToken: () => string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const expiresIn: string = envVars.JWT_EXPIRES_IN || "7d";
userSchema.methods.generateToken = function (): string {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    envVars.JWT_SECRET,
    { expiresIn }
  );
  return token;
};

userSchema.pre<IUser>("save", async function (next) {
  // Hash password only if it has been modified (or is new)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, envVars.SALT_ROUND);
  }
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
