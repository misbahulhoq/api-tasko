import Task, { ITask } from "../models/task.model";
import AppError from "../utils/AppError";

const createTaskService = async (payload: Partial<ITask>) => {
  const { title, description, user, startDate, endDate } = payload;

  if (!title || !description || !user || !startDate || !endDate) {
    throw new AppError(400, "All fields are required");
  }
  const task = await Task.create(payload);
  return task;
};

export const TaskServices = {
  createTaskService,
};
