const topics = require("../db/data/test-data/topics");
const { selectTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  console.log("hello from controller");
  selectTopics()
    .then((topics) => {
      console.log(topics);
      res.status(200).send({ topics });
    })
    .catch(next);
};
