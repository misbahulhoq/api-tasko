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
          pasword: "test_password_123@",
        })
        .expect(400);
    });
  });

  describe("Login", () => {
    it("Should login a user if valid credentials provided.", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveProperty("authToken");
    });
  });
});
