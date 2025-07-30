import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", AuthControllers.signUpController);
router.post("/verify-account", AuthControllers.verifyAccountController);

export const AuthRoutes = router;
