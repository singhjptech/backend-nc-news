const deleteComment = require("../models/comments.model");

const deleteCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id).then(() => {
    res.status(204).send().catch(next);
  });
};

module.exports = { deleteCommentsById };
