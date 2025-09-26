"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const task_routes_1 = require("./task.routes");
const notifications_routes_1 = require("./notifications.routes");
exports.routes = (0, express_1.Router)();
const routeModules = [
    { path: "/auth", routes: auth_routes_1.AuthRoutes },
    { path: "/tasks", routes: task_routes_1.TaskRoutes },
    { path: "/notifications", routes: notifications_routes_1.NotificationRoutes },
];
routeModules.map((routeModule) => {
    exports.routes.use(routeModule.path, routeModule.routes);
});
exports.default = exports.routes;
