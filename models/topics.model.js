const db = require("../db/connection");

exports.selectTopics = () => {
  console.log("Hello from model");
  return db.query(`SELECT * FROM topics;`).then((topics) => {
    return topics.rows;
  });
};
