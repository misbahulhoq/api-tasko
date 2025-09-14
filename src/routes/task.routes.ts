import express from "express";
import { TaskControllers } from "../controllers/task.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get("/", auth(), TaskControllers.getTasks);

router.post("/", auth(), TaskControllers.createTask);

router.put("/:taskId", auth(), TaskControllers.updateTask);

export const TaskRoutes = router;
