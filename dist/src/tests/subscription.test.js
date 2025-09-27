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
(0, globals_1.describe)("Subscription", () => {
    (0, globals_1.describe)("Subscribe", () => {
        (0, globals_1.test)("It should return 201-created a subscription if valid info is passed.", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/notifications/subscribe")
                .send({
                email: "test@mail.com",
                endpoint: "https://test.com",
                keys: {
                    p256dh: "test_p256dh",
                    auth: "test_auth",
                },
            })
                .expect(201);
            (0, globals_1.expect)(response.body.data).not.toBeNull();
            (0, globals_1.expect)(response.body.data).toHaveProperty("email");
            (0, globals_1.expect)(response.body.data).toHaveProperty("_id");
            (0, globals_1.expect)(response.body.data).toBeDefined();
        }));
        (0, globals_1.test)("It should return 400 if email is missing in the request body ", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/notifications/subscribe")
                .send({})
                .expect(400);
            (0, globals_1.expect)(response.body.data).toBeNull();
            (0, globals_1.expect)(response.body.statusCode).toBe(400);
        }));
    });
});
