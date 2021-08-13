const db = require("../db/connection");
const users = require("../db/data/test-data/users");

const selectUsers = async () => {
  const result = await db.query(`SELECT * FROM users;`);

  if (result.rowCount === 0) {
    return Promise.reject({ status: 404, msg: "user not found" });
  }

  return result.rows;
};

const selectUsersById = async (username) => {
  const result = await db.query(`SELECT * FROM users WHERE username = $1;`, [
    username,
  ]);

  if (result.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: `username: ${username} is not valid`,
    });
  }

  return result.rows[0];
};

const updateUserById = async (name, username) => {
  if (
    !name ||
    !username ||
    typeof name !== "string" ||
    typeof username !== "string"
  ) {
    return Promise.reject({
      status: 400,
      msg: "user not found",
    });
  }

  const result = await db.query(
    `UPDATE users
     SET name = $1
     WHERE username = $2
     RETURNING *;`,
    [name, username]
  );

  if (result.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: "incorrect username",
    });
  }

  return result.rows[0];
};

module.exports = { selectUsers, selectUsersById, updateUserById };
