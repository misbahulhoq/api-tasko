import { Request, Response } from "express";
import { TaskServices } from "../services/task.service";
import sendResponse from "../utils/sendResponse";

const createTask = async (req: Request, res: Response) => {
  const task = await TaskServices.createTask(req.body);
  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully.",
    data: task,
  });
};

const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskServices.getTasks(req.cookies.email);
  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks fetched successfully.",
    data: tasks,
  });
};

export const TaskControllers = {
  createTask,
  getTasks,
};
