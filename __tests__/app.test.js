const request = require("supertest");
const app = require("../app");
const { endpoints } = require("../controllers/api.controller");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  test("GET 200: returns with JSON object of endpoints", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body).toEqual(endpoints);
  });

  describe("/api/... 404 for non-existent route/typos", () => {
    test("404: returns route not found for non-existent route/typos", async () => {
      const { body } = await request(app).get("/not-route").expect(404);
      expect(body).toEqual({ msg: "route not found" });
    });
  });
});

describe("/api/topics", () => {
  describe(" GET /topics", () => {
    test("GET 200: returns topic objects", async () => {
      const { body } = await request(app).get("/api/topics").expect(200);
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

describe("/api/articles/", () => {
  describe("GET /articles/:article_id", () => {
    test("GET 200: returns with the data object for the article_id", async () => {
      const { body } = await request(app).get("/api/articles/1").expect(200);
      expect(body.article).toMatchObject({
        author: "butter_bridge",
        title: "Living in the shadow of a great man",
        article_id: expect.any(Number),
        body: "I find this existence challenging",
        topic: "mitch",
        created_at: expect.any(String),
        votes: 100,
        comment_count: "13",
      });
    });
    test("400: returns bad request for an invalid article_id", async () => {
      const { body } = await request(app).get("/api/articles/bad").expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });
    test("404: returns not found for a non existent article_id", async () => {
      const { body } = await request(app)
        .get("/api/articles/99999")
        .expect(404);
      expect(body).toEqual({ msg: "not found" });
    });
  });

  describe("/articles/:article_id", () => {
    test("PATCH 200: return the updated data object for votes key on article as requested", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 25 })
        .expect(200);
      expect(body.article).toMatchObject({
        author: "butter_bridge",
        title: "Living in the shadow of a great man",
        article_id: expect.any(Number),
        body: "I find this existence challenging",
        topic: "mitch",
        created_at: expect.any(String),
        votes: 125,
        comment_count: "13",
      });
    });

    test("400: returns bad request invalid number of votes", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "not_a_number" })
        .expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });

    test("404: returns not found for invalid article_id", async () => {
      const { body } = await request(app)
        .patch("/api/articles/99999")
        .send({ inc_votes: 25 })
        .expect(404);
      expect(body).toEqual({ msg: "not found" });
    });

    test("400: for request without inc_votes on the request body", async () => {
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

    test("GET 200: returns with an array of article objects sorted by date descending by default", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      expect(body.articles).toBeSortedBy("created_at", { descending: true });
      expect(body.articles[0]).toMatchObject({
        author: "icellusedkars",
        title: "Eight pug gifs that remind me of mitch",
        article_id: 3,
        body: "some gifs",
        topic: "mitch",
        created_at: expect.any(String),
        votes: 0,
        comment_count: 0,
      });
    });

    test("GET 200: return articles sorted by votes", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200);
      expect(body.articles[0].article_id).toBe(1);
      expect(body.articles).toBeSortedBy("votes", { descending: true });
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

    test("GET 200: return articles sorted by topic", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=topic")
        .expect(200);
      expect(body.articles[0].article_id).toBe(11);
      expect(body.articles).toBeSortedBy("topic", { descending: true });
    });

    test("400: returns with sort_by error message when an invalid column is provided at the query URL", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=notValid")
        .expect(400);
      expect(body).toEqual({ msg: "Not a valid sort_by column" });
    });

    test("400: returns with an order error message when an invalid column is provided at the query URL", async () => {
      const { body } = await request(app)
        .get("/api/articles?order=flat")
        .expect(400);
      expect(body).toEqual({ msg: "Not a valid order provided" });
    });

    // test("404: returns not found when an non-existent topic is provided at the query URL", async () => {
    //   const { body } = await request(app)
    //     .get("/api/articles?topic=bananas")
    //     .expect(404);
    //   expect(body).toEqual({ msg: "not found" });
    // });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET /api/articles/:article_id/comments", () => {
    test("GET 200: returns with an array of comments, with specified properties for specified article_id)", async () => {
      const { body } = await request(app)
        .get("/api/articles/1/comments")
        .expect(200);
      expect(body.comments.length).toBe(13);
      body.comments.forEach((comment) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
        });
      });
    });

    test("400: returns for an invalid article_id", async () => {
      const { body } = await request(app)
        .get("/api/articles/inValidArticle_id/comments")
        .expect(400);
      expect(body.msg).toBe("bad request");
    });

    test("404: returns No article was found for article_id- ", async () => {
      const { body } = await request(app)
        .get("/api/articles/99999/comments")
        .expect(404);
      expect(body).toEqual({
        msg: "No article was found for article_id: 99999",
      });
    });

    test("GET 200: returns with an empty array for provided article id with no comments", async () => {
      const { body } = await request(app)
        .get("/api/articles/4/comments")
        .expect(200);
      expect(body.comments).toBeInstanceOf(Array);
      expect(body.comments).toHaveLength(0);
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    test("POST 201: returns with the comment posted with given username and body of the comment", async () => {
      const commentToPost = {
        username: "butter_bridge",
        body: "Coding is the future",
      };
      const { body } = await request(app)
        .post("/api/articles/1/comments")
        .send(commentToPost)
        .expect(201);
      expect(body.comment).toEqual([
        {
          article_id: 1,
          author: "butter_bridge",
          body: "Coding is the future",
          comment_id: 19,
          created_at: expect.any(String),
          votes: 0,
        },
      ]);
    });

    test("400: returns invalid comment request - if username/body or both are empty strings", async () => {
      const commentToPost = {
        username: "",
        body: "",
      };
      const { body } = await request(app)
        .post("/api/articles/1/comments")
        .send(commentToPost)
        .expect(400);
      expect(body).toEqual({
        msg: "invalid comment request",
      });
    });

    test("404: returns with error for new user not setup in database", async () => {
      const commentToPost = {
        username: "iAm_notSetup",
        body: "Coding is the future",
      };
      const { body } = await request(app)
        .post("/api/articles/1/comments")
        .send(commentToPost)
        .expect(404);
      expect(body).toEqual({
        msg: "username not found",
      });
    });

    test("400: returns with error for invalid id input", async () => {
      const commentToPost = {
        username: "butter_bridge",
        body: "Coding is the future",
      };
      const { body } = await request(app)
        .post("/api/articles/invalidString/comments")
        .send(commentToPost)
        .expect(400);
      expect(body).toEqual({
        msg: "bad request",
      });
    });

    test("404: returns not found for non-existant ids ", async () => {
      const { body } = await request(app)
        .post("/api/articles/99999/comments")
        .expect(404);
      expect(body).toEqual({
        msg: "not found",
      });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    test("DELETE 204: returns an empty response body", async () => {
      const { body } = await request(app).delete("/api/comments/2").expect(204);
      expect(body).toEqual({});
    });

    test("400: returns invalid input", async () => {
      const { body } = await request(app)
        .delete("/api/comments/notValid")
        .expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });

    test("404: returns not found for invalid comment_id", async () => {
      const { body } = await request(app)
        .delete("/api/comments/99999")
        .expect(404);
      expect(body).toEqual({ msg: "comment not found" });
    });
  });

  describe("PATCH /api/comments/:comment_id", () => {
    test("PATCH 200: return the updated data object for votes key on comment_id as requested", async () => {
      const { body } = await request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 34 })
        .expect(200);
      expect(body.comment).toMatchObject({
        comment_id: 1,
        author: "butter_bridge",
        article_id: 9,
        votes: 50,
        created_at: expect.any(String),
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      });
    });
    test("400: returns bad request for string of incorrect input", async () => {
      const { body } = await request(app)
        .patch("/api/comments/notValid")
        .send({ inc_votes: 34 })
        .expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });
    test("404: returns not found for invalid comment_id", async () => {
      const { body } = await request(app)
        .patch("/api/comments/99999")
        .send({ inc_votes: 34 })
        .expect(404);
      expect(body).toEqual({ msg: "comment not found" });
    });
    test("400: returns bad request if inc_votes is missing or not a number", async () => {
      const { body } = await request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "notNumber" })
        .expect(400);
      expect(body).toEqual({ msg: "bad request" });
    });
  });
});

describe("/api/users", () => {
  describe("GET /users", () => {
    test("GET 200: returns users object", async () => {
      const { body } = await request(app).get("/api/users").expect(200);
      expect(body.users.length).toBe(4);
      body.users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          avatar_url: expect.any(String),
          name: expect.any(String),
        });
      });
    });
  });
  describe("GET /users/:username", () => {
    test("GET 200: returns the data object for the username", async () => {
      const { body } = await request(app)
        .get("/api/users/rogersop")
        .expect(200);
      expect(body.user).toMatchObject({
        username: "rogersop",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        name: "paul",
      });
    });

    test("404: returns username is not valid for non-existant username", async () => {
      const { body } = await request(app).get("/api/users/99999").expect(404);
      expect(body).toEqual({ msg: "username: 99999 is not valid" });
    });
  });
});
