"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: A unique id for each task
 *         title:
 *           type: string
 *           description: A meaningful title of the task
 *         description:
 *           type: string
 *           description: A description of the task
 *         user:
 *           type: string
 *           description: Email of the user
 *         status:
 *           type: string
 *           description: Status of the task (e.g. done, pending, ongoing)
 *         priority:
 *           type: string
 *           description: Priority of the task (e.g. low, high)
 *       example:
 *         _id: 68c2e3d0f0f5002d2c2b7faa
 *         title: The New Turing Omnibus
 *         user: user@example.com
 *         status: pending
 *         startDate: 2025-09-11T00:00:00.000+00:00
 *         endDate: 2025-09-11T00:00:00.000+00:00
 *         priority: high
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2025-09-11T14:59:28.453+00:00
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Task
 *     description: Task related endpoints
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all the tasks of a user.
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Successfully retrieved the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved the tasks
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 */
router.get("/", (0, auth_1.auth)(), task_controller_1.TaskControllers.getTasks);
/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a task by its ID.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved the task
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get("/:taskId", (0, auth_1.auth)(), task_controller_1.TaskControllers.getTaskById);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task.
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 */
router.post("/", (0, auth_1.auth)(), task_controller_1.TaskControllers.createTask);
/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update an existing task by its ID.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.put("/:taskId", (0, auth_1.auth)(), task_controller_1.TaskControllers.updateTask);
/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task by its ID.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.delete("/:taskId", (0, auth_1.auth)(), task_controller_1.TaskControllers.deleteTask);
exports.TaskRoutes = router;
