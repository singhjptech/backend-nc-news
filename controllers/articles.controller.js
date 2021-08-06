const {
  selectArticleById,
  updateArticleById,
} = require("../models/articles.model");

const getArticles = (req, res, next) => {
  console.log("hello from article control");
  //selectArticles().then((articles) => {
  //res.status(200).send({ articles });
  // });
};

const getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const patchArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const newVote = req.body.inc_votes;
  updateArticleById(article_id, newVote)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = { getArticles, getArticlesById, patchArticlesById };
