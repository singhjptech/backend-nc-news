const usersRouter = require("express").Router();
const { getUsers, getUsersById } = require("../controllers/users.controller");

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUsersById);

module.exports = usersRouter;
