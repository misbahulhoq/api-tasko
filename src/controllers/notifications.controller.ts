import { Request, Response } from "express";
import { NotificationServices } from "../services/subscription.service";
import sendResponse from "../utils/sendResponse";
const subscribe = async (req: Request, res: Response) => {
  const subscription = await NotificationServices.subscribe(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Subscription created successfully",
    data: subscription,
  });
};

const notify = async (req: Request, res: Response) => {};

export const NotificationControllers = { subscribe, notify };
