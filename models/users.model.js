const db = require("../db/connection");

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
module.exports = { selectUsers, selectUsersById };
