const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  patchArticlesById,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById);

module.exports = articlesRouter;
