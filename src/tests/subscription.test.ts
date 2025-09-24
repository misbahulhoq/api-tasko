import { describe, expect, test } from "@jest/globals";
import app from "../app";
import request from "supertest";

describe("Subscription", () => {
  describe("Subscribe", () => {
    test("It should return 201-created a subscription if valid info is passed.", async () => {
      const response = await request(app)
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
      expect(response.body.data).not.toBeNull();
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toBeDefined();
    });

    test("It should return 400 if email is missing in the request body ", async () => {
      const response = await request(app)
        .post("/api/v1/notifications/subscribe")
        .send({})
        .expect(400);
      expect(response.body.data).toBeNull();
      expect(response.body.statusCode).toBe(400);
    });
  });
});
