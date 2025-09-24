import express from "express";
import { NotificationControllers } from "../controllers/notifications.controller";

const router = express.Router();

router.post("/subscribe", NotificationControllers.subscribe);
router.post("/notify", NotificationControllers.notify);

export const NotificationRoutes = router;
