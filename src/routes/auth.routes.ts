import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", AuthControllers.signUpController);
router.get("/get-email", AuthControllers.sendUsersEmail);
router.post("/login", AuthControllers.loginController);
router.post("/verify-login", AuthControllers.verifyLoginCodeController);
router.post("/request-new-otp", AuthControllers.getNewVerificationCode);
router.post("/me", AuthControllers.getUserInfo);

export const AuthRoutes = router;
