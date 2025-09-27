import Task, { ITask } from "../models/task.model";
import AppError from "../utils/AppError";
import { daySummary } from "../utils/daySummary";
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

const getTasks = async (payload: {
  email: string;
  page?: string;
  limit?: string;
  status?: "pending" | "ongoing" | "done";
  query?: string;
}) => {
  const { email, query, page, limit } = payload;
  const skip = (Number(page || 1) - 1) * Number(limit || 10);

  const tasks = await Task.find({
    user: email,
    $or: query ? [{ title: query || "" }, { description: query || "" }] : [{}],
  })
    .skip(skip)
    .limit(Number(limit || 10))
    .lean();

  const total = await Task.find({ user: email }).countDocuments();
  const totalPages = Math.ceil(total / Number(limit));
  const formattedTasks = tasks.map((task) => {
    return {
      ...task,
      ...daySummary(task.startDate, task.endDate),
    };
  });
  return { tasks: formattedTasks, totalPages };
};

const getTaskById = async (id: string) => {
  const task = await Task.findOne({ _id: id }).lean();

  if (!task) {
    throw new AppError(404, "Task not found");
  }
  const { daySummary: summary, daysRemaining } = daySummary(
    task.startDate,
    task.endDate
  );

  return { ...task, daySummary: summary, daysRemaining };
};

const deleteTask = async (id: string) => {
  const task = await Task.findOne({ _id: id });
  if (!task) {
    throw new AppError(404, "Task not found");
  }
  await Task.deleteOne({ _id: id });
  return task;
};

export const TaskServices = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
