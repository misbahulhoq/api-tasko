import express from "express";
import Subscription from "../models/subscription.model";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const subscription = req.body;
  console.log("trying to crate a subscription");
  await Subscription.create(subscription);
  console.log("subscription created");
  res.send({ message: "Subscribed successfully" });
});

export const NotificationRoutes = router;
