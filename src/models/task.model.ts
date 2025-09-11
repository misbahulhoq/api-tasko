import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  user: string;
  status: "pending" | "ongoing" | "done";
  priority: "medium" | "low" | "high";
  startDate?: Date;
  endDate?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    user: {
      type: String,
      required: [true, "User email is required"],
    },
    status: {
      type: String,
      enum: ["done", "ongoing", "pending"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the Mongoose model
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
