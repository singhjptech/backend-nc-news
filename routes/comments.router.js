const commentsRouter = require("express").Router();
const { deleteCommentsById } = require("../controllers/comments.controller");

commentsRouter.route("/:comment_id").delete(deleteCommentsById);

module.exports = commentsRouter;
