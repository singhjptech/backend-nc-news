const db = require("../db/connection");

const selectTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);

  if (result.rowCount === 0) {
    return Promise.reject({ status: 404, msg: "topic not found" });
  }

  return result.rows;
};

module.exports = { selectTopics };
