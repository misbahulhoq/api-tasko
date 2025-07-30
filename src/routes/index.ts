import { Router } from "express";
import { AuthRoutes } from "./auth.routes";

export const routes = Router();

const routeModules: { path: string; routes: Router }[] = [
  { path: "/auth", routes: AuthRoutes },
];

routeModules.map((routeModule) => {
  routes.use(routeModule.path, routeModule.routes);
});

export default routes;
