import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import AuthValidatorSchemas from "../validations/auth.validation";
import { auth } from "../middlewares/auth";

const router = Router();

/**
 *  * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post(
  "/signup",
  validateRequest(AuthValidatorSchemas.signup),
  AuthControllers.signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */

router.post("/login", AuthControllers.login);
router.post("/send-otp/test", AuthControllers.sendOtpInTest);

/**
 * @swagger
 * /auth/get-email:
 *   get:
 *     summary: Get user email
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User email retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/get-email", AuthControllers.sendUsersEmail);

/**
 * @swagger
 * /auth/verify-login:
 *   post:
 *     summary: Verify login code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: number
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login code verified successfully
 *       400:
 *         description: Validation error
 */
router.post("/verify-login", AuthControllers.verifyLoginCode);

/**
 * @swagger
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 **/

router.post("/request-new-otp", AuthControllers.getNewVerificationCode);
router.post("/me", auth(), AuthControllers.getUserInfo);
router.post("/logout", AuthControllers.logout);

export const AuthRoutes = router;
