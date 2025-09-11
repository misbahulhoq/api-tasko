import Task, { ITask } from "../models/task.model";
import AppError from "../utils/AppError";

const createTask = async (payload: Partial<ITask>) => {
  const { title, description, user, startDate, endDate } = payload;
  if (!title || !description || !user || !startDate || !endDate) {
    throw new AppError(400, "All fields are required");
  }
  const task = await Task.create(payload);
  return task;
};

const getTasks = async (email: string) => {
  const tasks = await Task.find({ user: email });
  return tasks;
};

export const TaskServices = {
  createTask,
  getTasks,
};
