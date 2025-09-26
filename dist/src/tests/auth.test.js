"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const db_config_1 = require("../config/db.config");
const user_model_1 = __importDefault(require("../models/user.model"));
const testUser = {
    name: "Md Mezbah Uddin",
    email: "test@mail.com",
    password: "test_password_123@",
};
beforeAll(() => {
    (0, db_config_1.connectDb)();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteOne({ email: testUser.email });
    (0, db_config_1.disconnectDb)();
}));
(0, globals_1.describe)("Auth", () => {
    (0, globals_1.describe)("Signup", () => {
        (0, globals_1.test)("It should return 201-created a user if valid info is passed.", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/signup")
                .send(testUser)
                .expect(201);
            (0, globals_1.expect)(response.body.data).not.toBeNull();
            (0, globals_1.expect)(response.body.data).toHaveProperty("email");
            (0, globals_1.expect)(response.body.data).toHaveProperty("_id");
            (0, globals_1.expect)(response.body.data).toBeDefined();
        }));
        (0, globals_1.test)("It should return 409 conflict if same email is tried twice", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/signup").send(testUser).expect(409);
        }));
        (0, globals_1.test)("It should return 400- bad request if data is not fulfilled.", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/signup")
                .send({
                name: "Md Mezbah Uddin",
                password: "test_password_123@",
            })
                .expect(400);
        }));
    });
    (0, globals_1.describe)("Login", () => {
        it("Should login a user if valid credentials provided.", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({
                email: testUser.email,
                password: testUser.password,
            })
                .expect(200);
        }));
        it("Should return 401 if invalid credentials provided.", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({
                email: testUser.email,
                password: "a wrong password",
            })
                .expect(401);
        }));
        it("Should return 404 if invalid email provided.", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({
                email: "invalid@mail.com",
                password: testUser.password,
            })
                .expect(404);
        }));
    });
    (0, globals_1.describe)("Verify Otp and get user info", () => {
        it("Should pass if valid otp and valid accessToken provided", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const user = yield user_model_1.default.findOne({ email: testUser.email });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/verify-login")
                .set("Cookie", [`email=${testUser.email}`])
                .send({ code: (_a = user === null || user === void 0 ? void 0 : user.loginVerification) === null || _a === void 0 ? void 0 : _a.code });
            (0, globals_1.expect)(response.body.data).not.toBeNull();
            (0, globals_1.expect)(response.body.data).toHaveProperty("accessToken");
            const userData = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/me")
                .set("Cookie", [`accessToken=${response.body.data.accessToken}`])
                .expect(200);
            (0, globals_1.expect)(userData.body.data).not.toHaveProperty("password");
        }));
        it("Should fail if invalid otp and invalid accessToken provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: testUser.email });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/verify-login")
                .set("Cookie", [`email=${testUser.email}`])
                .send({ code: 101011 })
                .expect(400);
            yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/me")
                .set("Cookie", [`accessToken=invalidAccessToken`])
                .expect(401);
        }));
    });
});
