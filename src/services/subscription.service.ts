import Subscription, { ISubscription } from "../models/notifications.model";
import AppError from "../utils/AppError";
import webpush from "../config/webpush.config";

const subscribe = async (payload: ISubscription & { email: string }) => {
  if (!payload.email) throw new AppError(400, "Email is required");
  const subscription = await Subscription.create(payload);
  return subscription;
};

const notify = async () => {
  const subscriptions = await Subscription.find();
  if (subscribe.length === 0) {
    return;
  }

  const payload = JSON.stringify({
    title: "⏰ Reminder",
    body: "testing background notification",
  });
  subscriptions.forEach((sub) => {
    webpush.sendNotification(sub, payload);
  });
};

export const NotificationServices = {
  subscribe,
  notify,
};
