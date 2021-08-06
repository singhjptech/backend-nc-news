const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

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

module.exports = { selectArticleById, updateArticleById };
