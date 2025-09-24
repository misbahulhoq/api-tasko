import { describe, expect, test } from "@jest/globals";
import app from "../app";
import request from "supertest";
import { connectDb, disconnectDb } from "../config/db.config";
import User from "../models/user.model";

const testUser = {
  name: "Md Mezbah Uddin",
  email: "test@mail.com",
  password: "test_password_123@",
};

beforeAll(() => {
  connectDb();
});
afterAll(async () => {
  await User.deleteOne({ email: testUser.email });
  disconnectDb();
});

describe("Auth", () => {
  describe("Signup", () => {
    test("It should return 201-created a user if valid info is passed.", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .expect(201);
      expect(response.body.data).not.toBeNull();
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toBeDefined();
    });

    test("It should return 409 conflict if same email is tried twice", async () => {
      await request(app).post("/api/v1/auth/signup").send(testUser).expect(409);
    });

    test("It should return 400- bad request if data is not fulfilled.", async () => {
      await request(app)
        .post("/api/v1/auth/signup")
        .send({
          name: "Md Mezbah Uddin",
          password: "test_password_123@",
        })
        .expect(400);
    });
  });

  describe("Login", () => {
    it("Should login a user if valid credentials provided.", async () => {
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);
    });

    it("Should return 401 if invalid credentials provided.", async () => {
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUser.email,
          password: "a wrong password",
        })
        .expect(401);
    });

    it("Should return 404 if invalid email provided.", async () => {
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "invalid@mail.com",
          password: testUser.password,
        })
        .expect(404);
    });
  });

  describe("Verify Otp and get user info", () => {
    it("Should pass if valid otp and valid accessToken provided", async () => {
      const user = await User.findOne({ email: testUser.email });
      const response = await request(app)
        .post("/api/v1/auth/verify-login")
        .set("Cookie", [`email=${testUser.email}`])
        .send({ code: user?.loginVerification?.code });
      expect(response.body.data).not.toBeNull();
      expect(response.body.data).toHaveProperty("accessToken");

      const userData = await request(app)
        .post("/api/v1/auth/me")
        .set("Cookie", [`accessToken=${response.body.data.accessToken}`])
        .expect(200);
      expect(userData.body.data).not.toHaveProperty("password");
    });

    it("Should fail if invalid otp and invalid accessToken provided", async () => {
      const user = await User.findOne({ email: testUser.email });
      const response = await request(app)
        .post("/api/v1/auth/verify-login")
        .set("Cookie", [`email=${testUser.email}`])
        .send({ code: 101011 })
        .expect(400);

      await request(app)
        .post("/api/v1/auth/me")
        .set("Cookie", [`accessToken=invalidAccessToken`])
        .expect(401);
    });
  });
});
