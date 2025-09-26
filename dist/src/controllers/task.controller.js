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
exports.TaskControllers = void 0;
const task_service_1 = require("../services/task.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_service_1.TaskServices.createTask(req.body);
    return (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Task created successfully.",
        data: task,
    });
});
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_service_1.TaskServices.getTasks(req.cookies.email);
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Tasks fetched successfully.",
        data: tasks,
    });
});
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.taskId;
    const task = yield task_service_1.TaskServices.getTaskById(_id);
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Task fetched successfully.",
        data: task,
    });
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.taskId;
    const task = yield task_service_1.TaskServices.updateTask(Object.assign({ _id }, req.body));
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Task updated successfully.",
        data: task,
    });
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.taskId;
    const task = yield task_service_1.TaskServices.deleteTask(_id);
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Task deleted successfully.",
        data: task,
    });
});
exports.TaskControllers = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
