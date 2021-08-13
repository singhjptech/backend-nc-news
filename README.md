# Northcoders News API - Jatinder

Hosted Project - https://nc-news-jatinder.herokuapp.com/api

## Project Summary

Building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.
Database used is PSQL, and will interact using [node-postgres](https://node-postgres.com/).
Setup and seeding phase of this project has been done in pair with team, and building of the server and endpoints has been done in solo sprint.

## Some of the avaiable endpoints

GET /api (provides detailed information on all available endpoints)
GET /api/topics
GET /api/articles
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles (sort_by - votes, article_id&order, topic)
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
DELETE /api/comments/:comment_id
PATCH /api/comments/:comment_id
GET /api/user
GET /api/users/:username
PATCH /api/users/:username (by inc_votes)
POST /api/users (add a new user)

## Mininum requriements

PostgresSQL v12.7
Node.js v12

## Step 1 - Setting up of the project

`Git clone https://github.com/singhjptech/be-nc-news.git` - this will clone the repo
`Run npm install` - for dependencies to be installed.
Dependencies(check package.json for more details) used in the Project are -

1. Express
2. Jest
3. pg
4. pg-format
5. dotenv
6. Supertest
7. Jest-sorted

Create _two_ `.env` files for the project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=nc_news_test` and `PGDATABASE=nc_news` respectively, with the correct database name for that environment. The `.env` files should be in .gitignore.

## Step 2 - Creating tables and Seeding

TO create the tables and to seed data, connection to database is provided in `connection.js`.
Setup & run the database and seed, package.json can used for correct instructions.

1. `npm run setup-dbs` - this will drop and create both dev and test databases
2. `npm run seed` - this will run the seeding process

## Step 3 - Run the test suites

Test suites for testing the seeding functions are available in `__tests__` as `utils.test.js` and `app.test.js`.
They can be run as -

1. `npm test __tests__` - will run all the tests
2. `npm test __tests__/app.test.js` - will run the tests for all the endpoints
3. `npm test __tests__/utils.test.js` - will run the test for seeding process
