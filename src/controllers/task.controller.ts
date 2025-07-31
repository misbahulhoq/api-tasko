import { Request, Response } from "express";
import { TaskServices } from "../services/task.service";
import sendResponse from "../utils/sendResponse";

const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const task = await TaskServices.createTaskService({ title, description });
  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully.",
    data: task,
  });
};

export const TaskControllers = {
  createTask,
};
