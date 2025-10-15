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
exports.TaskServices = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const daySummary_1 = require("../utils/daySummary");
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, user, startDate, endDate } = payload;
    if (!title || !description || !user || !startDate || !endDate) {
        throw new AppError_1.default(400, "All fields are required");
    }
    const task = yield task_model_1.default.create(payload);
    return task;
});
const updateTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = payload;
    if (!_id) {
        throw new AppError_1.default(400, "Task id is required");
    }
    const task = yield task_model_1.default.findOne({ _id });
    if (!task || task.status === "done") {
        throw new AppError_1.default(404, "Task not found");
    }
    yield task_model_1.default.updateOne({ _id }, payload);
    return task;
});
const getTasks = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, search, page: pagePayload, limit: limitPayload } = payload;
    const page = Number(pagePayload || 1);
    const limit = Number(limitPayload || 10);
    const skip = (page - 1) * limit;
    const tasks = yield task_model_1.default.find({
        user: email,
        $or: search
            ? [
                { title: { $regex: search || "", $options: "i" } },
                { description: { $regex: search || "", $options: "i" } },
            ]
            : [{}],
    })
        .skip(skip)
        .limit(limit)
        .lean();
    let total;
    if (search) {
        total = tasks.length;
    }
    else {
        total = yield task_model_1.default.find({ user: email }).countDocuments();
    }
    const totalPages = Math.ceil(total / limit);
    console.log({ totalPages, total });
    const formattedTasks = tasks.map((task) => {
        return Object.assign(Object.assign({}, task), (0, daySummary_1.daySummary)(task.startDate, task.endDate));
    });
    return { tasks: formattedTasks, totalPages };
});
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findOne({ _id: id }).lean();
    if (!task) {
        throw new AppError_1.default(404, "Task not found");
    }
    const { daySummary: summary, daysRemaining } = (0, daySummary_1.daySummary)(task.startDate, task.endDate);
    return Object.assign(Object.assign({}, task), { daySummary: summary, daysRemaining });
});
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findOne({ _id: id });
    if (!task) {
        throw new AppError_1.default(404, "Task not found");
    }
    yield task_model_1.default.deleteOne({ _id: id });
    return task;
});
exports.TaskServices = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
