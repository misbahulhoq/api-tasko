import express from "express";
import verifyUser from "../middlewares/verifyuser.middleware";
import { TaskControllers } from "../controllers/task.controller";

const router = express.Router();

router.get("/", verifyUser, (req, res) => {
  res.send("Task routes");
});

router.post("/", verifyUser, TaskControllers.createTask);

export const TaskRoutes = router;
