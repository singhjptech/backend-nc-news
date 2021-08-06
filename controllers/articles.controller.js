const {
  selectArticles,
  selectArticleById,
  updateArticleById,
} = require("../models/articles.model");

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

const getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = { getArticles, getArticlesById, patchArticlesById };
