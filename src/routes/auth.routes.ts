import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", AuthControllers.signUpController);
router.get("/get-email", AuthControllers.sendUsersEmail);
router.post("/login", AuthControllers.loginController);
router.post("/verify-account", AuthControllers.verifyLoginCodeController);
// router.post("/verify-login");

export const AuthRoutes = router;
