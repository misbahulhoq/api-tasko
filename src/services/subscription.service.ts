import Subscription, { ISubscription } from "../models/notifications.model";
import AppError from "../utils/AppError";

const subscribe = async (payload: ISubscription & { email: string }) => {
  if (!payload.email) throw new AppError(400, "Email is required");
  const subscription = await Subscription.create(payload);
  return subscription;
};

export const NotificationServices = {
  subscribe,
};
