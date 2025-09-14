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

const updateTask = async (payload: Partial<ITask>) => {
  const { _id } = payload;
  if (!_id) {
    throw new AppError(400, "Task id is required");
  }
  const task = await Task.findOne({ _id });
  if (!task || task.status === "done") {
    throw new AppError(404, "Task not found");
  }
  await Task.updateOne({ _id }, payload);
  return task;
};

const getTasks = async (email: string) => {
  const tasks = await Task.find({ user: email });
  return tasks;
};

export const TaskServices = {
  createTask,
  getTasks,
  updateTask,
};
