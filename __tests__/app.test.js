const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const { endpoints } = require("../controllers/api.controller");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  test("responds with JSON object of endpoints", () => {
    return request(app).get("/api").expect(200);
    expect(body).toEqual({
      msg: "serves as endpoint for all the available points",
    });
  });

  describe("/api/... 404 for non-existent route/typos", () => {
    test("404 for non-existent route/typos", () => {
      return request(app).get("/not-route").expect(404);
      expect(body.msg).toBe("route not found");
    });
  });
});

describe("/api", () => {
  describe("/topics", () => {
    test("GET 200: returns topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length > 0).toBe(true);
          body.topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});
