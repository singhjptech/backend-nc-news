const {
  deleteComment,
  updateCommentById,
} = require("../models/comments.model");

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then((deletedComment) => {
      res.status(204).send({ deletedComment });
    })
    .catch(next);
};

const patchCommentById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateCommentById(inc_votes, comment_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

module.exports = { deleteCommentById, patchCommentById };
