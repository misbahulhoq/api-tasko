import mongoose from "mongoose";
import envVars from "./env.config";

export const dbConnect = async () => {
  try {
    await mongoose.connect(envVars.MONGO_URI);
    console.log("Database connected successfully..");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
