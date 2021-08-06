const db = require("../db/connection");

exports.selectTopics = async () => {
  await db.query(`SELECT * FROM topics;`).then((topics) => {
    return topics.rows;
  });
};
