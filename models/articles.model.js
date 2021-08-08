const db = require("../db/connection");

const selectArticleById = async (article_id) => {
  const queryStr = `SELECT articles.*, COUNT (comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id`;

  const result = await db.query(queryStr, [article_id]);
  const articleWithCommentCount = result.rows[0];

  articleWithCommentCount.comment_count =
    +articleWithCommentCount.comment_count;

  return articleWithCommentCount;
};

const updateArticleById = async (article_id, newVote) => {
  const article = await selectArticleById(article_id);

  const updatedArticle = article.votes + newVote;
  await db.query(
    `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`,
    [updatedArticle, article_id]
  );
  article.votes += newVote;

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

module.exports = { selectArticles, selectArticleById, updateArticleById };
