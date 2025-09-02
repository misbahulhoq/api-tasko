import mongoose from "mongoose";
import envVars from "./env.config";

const connectDb = async () => {
  try {
    await mongoose.connect(envVars.MONGO_URI);
    console.log("Database connected successfully..");
  } catch (error) {
    console.log(error);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

export { connectDb, disconnectDb };

export default connectDb;
