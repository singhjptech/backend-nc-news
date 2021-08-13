const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  patchUserById,
} = require("../controllers/users.controller");

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserById).patch(patchUserById);

module.exports = usersRouter;
