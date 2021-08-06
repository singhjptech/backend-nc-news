const db = require("../connection");
const format = require("pg-format");
const {
  mapTopic,
  mapUsers,
  formatComments,
  formatArticles,
} = require("../utils/data-manipulation");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  await db.query(`CREATE TABLE topics (
    slug VARCHAR(255) PRIMARY KEY NOT NULL,  
    description VARCHAR(255) NOT NULL);`);

  await db.query(`CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    avatar_url VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL);`);

  await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    topic VARCHAR(255) NOT NULL REFERENCES topics(slug),
    author VARCHAR(255) NOT NULL REFERENCES users(username),
    created_at TIMESTAMP DEFAULT current_timestamp);`);

  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL REFERENCES users(username),
    article_id INT NOT NULL REFERENCES articles(article_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT current_timestamp,
    body TEXT NOT NULL);`);

  const topicValues = mapTopic(topicData);
  const topicInsertStr = format(
    `INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
    topicValues
  );
  await db.query(topicInsertStr);

  const userValues = mapUsers(userData);
  const userInsertStr = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
    userValues
  );
  await db.query(userInsertStr);

  const articleValues = formatArticles(articleData);
  const articleInsertStr = format(
    `INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
    articleValues
  );
  const articleResult = await db.query(articleInsertStr);

  const commentValues = formatComments(commentData, articleResult.rows);
  const commentInsertStr = format(
    `INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
    commentValues
  );
  await db.query(commentInsertStr);
};

module.exports = seed;
