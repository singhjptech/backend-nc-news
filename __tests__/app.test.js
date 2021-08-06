const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const { endpoints } = require("../controllers/api.controllers");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  test("responds with JSON object of endpoints", async () => {
    const { body } = await request(app).get("/api").expect(200);

    expect(body).toEqual(endpoints);
  });

  describe("/api/... 404 for non-existent route/typos", () => {
    test("404 for non-existent route/typos", async () => {
      const { body } = await request(app).get("/not-route").expect(404);
      expect(body.msg).toBe("route not found");
    });
  });
});
