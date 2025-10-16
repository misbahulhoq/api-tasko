import Subscription, { ISubscription } from "../models/notifications.model";
import AppError from "../utils/AppError";
import webpush from "../config/webpush.config";
import cron from "node-cron";
import Task from "../models/task.model";

const subscribe = async (payload: ISubscription & { email: string }) => {
  if (!payload.email) throw new AppError(400, "Email is required");
  const subscriptionExists = await Subscription.findOne({
    email: payload.email,
  });
  if (subscriptionExists) return subscriptionExists;
  const subscription = await Subscription.create(payload);
  return subscription;
};

const notify = async () => {
  const subscriptions = await Subscription.find().lean();
  if (subscribe.length === 0) {
    return;
  }

  const now = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(now.getDate() + 3);
  const emails = subscriptions.map((sub) => sub.email);
  emails.forEach(async (email) => {
    const tasks = await Task.aggregate([
      {
        $match: {
          user: email,
          status: { $ne: "completed" },
        },
      },
      {
        $addFields: {
          remainingDays: {
            $ceil: {
              $divide: [{ $subtract: ["$endDate", now] }, 1000 * 60 * 60 * 24],
            },
          },
        },
      },
      { $sort: { remainingDays: 1 } },
    ]);

    if (tasks.length > 0) {
      subscriptions.forEach((sub) => {
        webpush.sendNotification(
          sub,
          JSON.stringify({
            title: `You have ${tasks.length} pending task${
              tasks.length > 1 ? "s" : ""
            }`,
            message: "Click to see them.",
          })
        );
      });
    }
  });

  console.log("sending a notification on each 10 minutes");
};

cron.schedule("*/10 * * * *", notify);

export const NotificationServices = {
  subscribe,
  notify,
};
