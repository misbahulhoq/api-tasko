"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notifications_controller_1 = require("../controllers/notifications.controller");
const router = express_1.default.Router();
router.post("/subscribe", notifications_controller_1.NotificationControllers.subscribe);
router.post("/notify", notifications_controller_1.NotificationControllers.notify);
exports.NotificationRoutes = router;
