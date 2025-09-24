import express from "express";
import { NotificationControllers } from "../controllers/subscription.controller";

const router = express.Router();

router.post("/subscribe", NotificationControllers.subscribe);

export const NotificationRoutes = router;
