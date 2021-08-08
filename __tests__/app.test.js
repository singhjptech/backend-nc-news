const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  test("responds with JSON object of endpoints", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body).toEqual({
      msg: "serves as endpoint for all the available points",
    });
  });

  describe("/api/... 404 for non-existent route/typos", () => {
    test("404 for non-existent route/typos", async () => {
      const { body } = await request(app).get("/not-route").expect(404);
      expect(body).toEqual({ msg: "route not found" });
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

  describe("/articles/:article_id", () => {
    test("GET 200: return with the data object for the article_id", async () => {
      const { body } = await request(app).get("/api/articles/1").expect(200);
      expect(body.article).toEqual(
        expect.objectContaining({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: expect.any(Number),
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: expect.any(String),
          votes: 100,
          comment_count: expect.any(Number),
        })
      );
    });
    test("400: for bad requess for an invalid article_id", async () => {
      const { body } = await request(app).get("/api/articles/bad").expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });
  });

  describe("/articles/:article_id", () => {
    test("PATCH 200: return the updated data object for votes key on article as requested", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 25 })
        .expect(200);
      expect(body.article).toEqual(
        expect.objectContaining({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: expect.any(Number),
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: expect.any(String),
          votes: 125,
          comment_count: expect.any(Number),
        })
      );
    });

    test("400 for an invalid number of votes", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "not_a_number" })
        .expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });

    test("400 for request without inc_votes on the request body", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ random_key: 25 })
        .expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });
  });

  describe("/api/articles", () => {
    test("GET 200: return articles objects", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      expect(body.articles.length).toBe(12);
      body.articles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
        });
      });
    });

    test("GET 200 - returns with an array of article objects sorted by date descending by default", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      expect(body.articles).toBeSortedBy("created_at", { descending: true });
      expect(body.articles[0]).toEqual({
        author: "icellusedkars",
        title: "Eight pug gifs that remind me of mitch",
        article_id: 3,
        body: "some gifs",
        topic: "mitch",
        created_at: "2020-11-03T09:12:00.000Z",
        votes: 0,
        comment_count: 0,
      });
    });

    test("GET 200: return articles sorted by ascending order", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=article_id&order=asc")
        .expect(200);
      expect(body.articles[0].article_id).toBe(1);
      expect(body.articles).toBeSortedBy("article_id", { ascending: true });
    });

    test("GET 200: return empty array for an existing topic that doesn't have any articles attributed to it", async () => {
      const { body } = await request(app)
        .get("/api/articles?topic=paper")
        .expect(200);
      expect(body.articles).toHaveLength(0);
    });

    test("400 - returns with sort_by error message when an invalid column is provided at the query URL", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=notValid")
        .expect(400);
      expect(body.msg).toEqual("Not a valid sort_by column");
    });

    test("400 - returns with an order error message when an invalid column is provided at the query URL", async () => {
      const { body } = await request(app)
        .get("/api/articles?order=flat")
        .expect(400);
      expect(body.msg).toEqual("Not a valid order provided");
    });
  });
});
