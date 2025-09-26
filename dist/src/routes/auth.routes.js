"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_validation_1 = __importDefault(require("../validations/auth.validation"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
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
router.post("/signup", (0, validate_middleware_1.validateRequest)(auth_validation_1.default.signup), auth_controller_1.AuthControllers.signup);
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
router.post("/login", auth_controller_1.AuthControllers.login);
router.post("/send-otp/test", auth_controller_1.AuthControllers.sendOtpInTest);
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
router.get("/get-email", auth_controller_1.AuthControllers.sendUsersEmail);
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
 *         message: Login code verified successfully
 *       400:
 *         message: Validation error
 */
router.post("/verify-login", auth_controller_1.AuthControllers.verifyLoginCode);
/**
 * @swagger
 * /auth/request-new-otp:
 *   post:
 *     summary: Verify login code
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login code verified successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *
 *       400:
 *         message: Validation error
 */
router.post("/request-new-otp", auth_controller_1.AuthControllers.getNewVerificationCode);
/**
 * @swagger
 * /auth/me:
 *   post:
 *     summary: Get user info
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/me", (0, auth_1.auth)(), auth_controller_1.AuthControllers.getUserInfo);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/logout", auth_controller_1.AuthControllers.logout);
exports.AuthRoutes = router;
