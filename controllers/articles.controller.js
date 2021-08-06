const { selectArticleById } = require("../models/articles.model");

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

module.exports = { getArticles, getArticlesById };
