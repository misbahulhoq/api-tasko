import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { TaskRoutes } from "./task.routes";
import { NotificationRoutes } from "./notifications.routes";

export const routes = Router();

const routeModules: { path: string; routes: Router }[] = [
  { path: "/auth", routes: AuthRoutes },
  { path: "/tasks", routes: TaskRoutes },
  { path: "/notifications", routes: NotificationRoutes },
];

routeModules.map((routeModule) => {
  routes.use(routeModule.path, routeModule.routes);
});

export default routes;
