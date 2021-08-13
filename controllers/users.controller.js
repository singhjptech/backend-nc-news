const {
  selectUsers,
  selectUsersById,
  updateUserById,
} = require("../models/users.model");
const usersRouter = require("../routes/users.router");

const getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUsersById(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const patchUserById = (req, res, next) => {
  const { username } = req.params;
  const { name } = req.body;
  updateUserById(name, username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUsers, getUserById, patchUserById };
