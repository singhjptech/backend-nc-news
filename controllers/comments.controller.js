const { deleteComment } = require("../models/comments.model");

const deleteCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then((deletedComment) => {
      res.status(204).send({ deletedComment });
    })
    .catch(next);
};

module.exports = { deleteCommentsById };
