import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Employee API Tests", () => {
  describe("GET /", () => {
    it('should send the string "Hello employees!"', async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello employees!");
    });
  });

  describe("GET /employees", () => {
    it("should send the array of employees", async () => {
      const response = await request(app).get("/employees");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(10);
    });
  });

  describe("GET /employees/:id", () => {
    it("should send the employee with the given id", async () => {
      const response = await request(app).get("/employees/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: "Carolynn McGinlay" });
    });

    it("should send 404 with a message if there is no employee with that id", async () => {
      const response = await request(app).get("/employees/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /employees/random", () => {
    it("should send a random employee from the array", async () => {
      const response = await request(app).get("/employees/random");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body.id).toBeGreaterThanOrEqual(1);
      expect(response.body.id).toBeLessThanOrEqual(10);
    });
  });
});
