# Northcoders News API - Jatinder

Hosted Project - https://nc-news-jatinder.herokuapp.com/api

## Project Summary

Building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.
Database used is PSQL, and will interact using [node-postgres](https://node-postgres.com/).
Setup and seeding phase of this project has been done in pair with team, and building of the server and endpoints has been done in solo sprint.
Mininum requriements -
PostgresSQL v12.7
Node.js v12

## Step 1 - Setting up of the project

Git clone - https://github.com/singhjptech/be-nc-news.git
Run npm install for dependencies
Requried project dependencies -

1. Express
2. Jest
3. pg
4. pg-format
5. dotenv
6. Supertest
7. Jest-sorted

Create _two_ `.env` files for the project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=nc_news_test` and `PGDATABASE=nc_news` respectively, with the correct database name for that environment. Double check that these `.env` files are .gitignored.

## Step 2 - Creating tables and Seeding

TO create the tables and to seed data, connection to database is provided in `connection.js`.
Setup & run the database and seed, package.json can used for correct instructions.

1. npm run setup-dbs
2. npm run seed

## Step 3 - Run the test suites

Test suites for testing the seeding functions are available in **tests** as utils.test.js and app.test.js. They can be run as

1. npm test
2. npm test app.test.js
3. npm test utils.test.js
