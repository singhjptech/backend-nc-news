const getEndpoints = (req, res, next) => {
  res.status(200).send(endpoints);
};

const endpoints = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api",
  },
  "GET /api/topics": {
    description: "serves an array of all topics",
    queries: [],
    exampleResponse: {
      topics: [{ slug: "football", description: "Footie!" }],
    },
  },
  "GET /api/articles": {
    description: "serves an array of all topics",
    queries: ["author", "topic", "sort_by", "order"],
    exampleResponse: {
      articles: [
        {
          title: "Seafood substitutions are increasing",
          topic: "cooking",
          author: "weegembump",
          body: "Text from the article..",
          created_at: 1527695953341,
        },
      ],
    },
  },
  "GET /api/articles/:article_id": {
    description: "serves the article matching the article_id provided",
    queries: [],
    exampleResponse: {
      article: {
        author: "butter_bridge",
        title: "Living in the shadow of a great man",
        article_id: 1,
        body: "I find this existence challenging",
        topic: "mitch",
        created_at: 1527695953341,
        votes: 100,
        comment_count: 8,
      },
    },
  },

  "PATCH /api/articles/:article_id": {
    description:
      "adds  or deduct votes to the vote count for the article matching provided article_id",
    queries: [],
    exampleRequest: { inc_votes: 25 },
    exampleResponse: {
      article: {
        author: "butter_bridge",
        title: "Living in the shadow of a great man",
        article_id: 1,
        body: "I find this existence challenging",
        topic: "mitch",
        created_at: 1527695953341,
        votes: 125,
        comment_count: 8,
      },
    },
  },
  "GET /api/articles/:article_id/comments": {
    description: "serves comments for the article matching provided article_id",
    queries: [],
    exampleResponse: {
      comments: [
        {
          comment_id: 31,
          votes: 11,
          created_at: 1527695953341,
          body: "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        },
      ],
    },
  },
  "POST /api/articles/:article_id/comments": {
    description: "posts a comment for the article matching provided article_id",
    queries: [],
    exampleRequest: { username: "butter_bridge", body: "Coding is the future" },
    exampleResponse: {
      comment: {
        article_id: 1,
        author: "butter_bridge",
        body: "Coding is the future",
        comment_id: 19,
        created_at: 1527695953341,
        votes: 0,
      },
    },
  },
};

module.exports = { getEndpoints };
