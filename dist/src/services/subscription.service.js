"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = void 0;
const notifications_model_1 = __importDefault(require("../models/notifications.model"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const webpush_config_1 = __importDefault(require("../config/webpush.config"));
const node_cron_1 = __importDefault(require("node-cron"));
const task_model_1 = __importDefault(require("../models/task.model"));
const subscribe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.email)
        throw new AppError_1.default(400, "Email is required");
    const subscriptionExists = yield notifications_model_1.default.findOne({
        email: payload.email,
    });
    if (subscriptionExists)
        return subscriptionExists;
    const subscription = yield notifications_model_1.default.create(payload);
    return subscription;
});
const notify = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptions = yield notifications_model_1.default.find().lean();
    if (subscribe.length === 0) {
        return;
    }
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);
    const emails = subscriptions.map((sub) => sub.email);
    emails.forEach((email) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield task_model_1.default.aggregate([
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
                webpush_config_1.default.sendNotification(sub, JSON.stringify({
                    title: `You have ${tasks.length} pending task${tasks.length > 1 ? "s" : ""}`,
                    message: "Click to see them.",
                }));
            });
        }
    }));
    console.log("sending a notification on each 10 minutes");
});
node_cron_1.default.schedule("*/10 * * * *", notify);
exports.NotificationServices = {
    subscribe,
    notify,
};
