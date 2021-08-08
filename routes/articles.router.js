const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  patchArticlesById,
  getCommentsByArticleId,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById);

articlesRouter.route("/:article_id/comments").get(getCommentsByArticleId);

module.exports = articlesRouter;
