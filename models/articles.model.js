const db = require("../db/connection");

const selectArticleById = async (article_id) => {
  const result = await db.query(
    `SELECT articles.*, COUNT(comment_id) AS comment_count 
        FROM articles 
        LEFT JOIN comments ON articles.article_id=comments.article_id
        WHERE articles.article_id=$1
        GROUP BY articles.article_id;`,
    [article_id]
  );

  if (result.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: "not found",
    });
  }

  return result.rows[0];
};

const updateArticleById = async (article_id, newVote) => {
  const article = await selectArticleById(article_id);

  const updatedArticle = article.votes + newVote;
  await db.query(
    `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`,
    [updatedArticle, article_id]
  );
  article.votes += newVote;

  if (article.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: "not found",
    });
  }

  return article;
};

const selectArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  const validColumns = [
    "author",
    "title",
    "article_id",
    "body",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];

  const validOrderOptions = ["ASC", "asc", "desc", "DESC"];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Not a valid sort_by column" });
  }

  if (!validOrderOptions.includes(order)) {
    return Promise.reject({ status: 400, msg: "Not a valid order provided" });
  }

  let queryValues = [];
  let queryStr = `SELECT articles.*, COUNT (comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id`;

  if (sort_by) {
    queryStr += ` ORDER BY ${sort_by} `;
  } else {
    queryStr += ` ORDER BY articles.created_at `;
  }

  if (order) {
    queryStr += ` ${order} `;
  } else {
    queryStr += ` DESC`;
  }

  queryStr += `;`;

  const allArticles = await db.query(queryStr, queryValues);

  return allArticles.rows;
};

const selectCommentsByArticleId = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM comments WHERE article_id = $1;`,
    [article_id]
  );

  if (result.rows.length === 0) {
    const resultByArticleId = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [article_id]
    );
    if (resultByArticleId.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No article was found for article_id: ${article_id}`,
      });
    }
  }
  return result.rows;
};

const insertComments = async (article_id, newComment) => {
  const resultWithArticleId = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [article_id]
  );
  if (resultWithArticleId.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `not found`,
    });
  }
  const { username, body } = newComment;

  if (username && body) {
    const usernameResult = await db.query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );
    if (usernameResult.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `username not found`,
      });
    }

    const result = await db.query(
      `INSERT INTO comments (author,article_id,body) VALUES($1,$2,$3) RETURNING *;`,
      [username, article_id, body]
    );
    return result.rows;
  } else {
    return Promise.reject({
      status: 400,
      msg: `invalid comment request`,
    });
  }
};

module.exports = {
  selectArticles,
  selectArticleById,
  updateArticleById,
  selectCommentsByArticleId,
  insertComments,
};
