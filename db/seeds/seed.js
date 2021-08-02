const db = require('../connection'); 

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS topics;`);
  await db.query(`DROP TABLE IF EXISTS articles;`)
  await db.query(`DROP TABLE IF EXISTS users;`)
  await db.query(`DROP TABLE IF EXISTS comments;`)

  await db.query(`CREATE TABLE topics (
    slug SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL
  );`)
  await db.query(`CREATE TABLE users (
    username SERIAL PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR(100) NOT NULL
  );`)
  await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    topic REFERENCES topics(slug),
    author REFERENCES users(username),
    created_at DATE DEFAULT CURRENT_TIMESTAMP()
  );`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author REFERENCES users(username),
    article_id REFERENCES articles(article_id),
    votes INT DEFAULTS 0,
    created_at DATE DEFAULT CURRENT_TIMESTAMP(),
    body TEXT
  )`);


  // 1. create tables
  // 2. insert data
};

// const checkTables = seed();

// console.log(checkTables);

module.exports = seed;
