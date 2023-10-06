import request, { Response } from "supertest";
import { app } from "src";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test Asset Controller", () => {
  test("It should get empty array of assets", async () => {
    const response = await request(app).get("/assets");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
