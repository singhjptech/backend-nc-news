const db = require("../connection");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  await db.query(`CREATE TABLE topics (
    slug VARCHAR(100) PRIMARY KEY NOT NULL,  
    description VARCHAR(50) 
    NOT NULL);`);

  await db.query(`CREATE TABLE users (
    username VARCHAR(100) PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR(100) NOT NULL);`);
  await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    topic VARCHAR(50) NOT NULL REFERENCES topics(slug),
    author VARCHAR(100) NOT NULL REFERENCES users(username),
    created_at DATE DEFAULT CURRENT_TIMESTAMP);`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(100) NOT NULL REFERENCES users(username),
    article_id INT NOT NULL REFERENCES articles(article_id),
    votes INT DEFAULT 0,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    body TEXT);`);
};

module.exports = seed;
