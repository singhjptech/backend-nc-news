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

module.exports = { selectArticleById };
