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

#############################################################################################################################################################################

Still working to points below :-

### Further Routes

#### **DELETE /api/comments/:comment_id**

Should:

- delete the given comment by `comment_id`

Responds with:

- status 204 and no content

---

#### **GET /api/users**

Responds with:

- an array of objects, each object should have the following property:
  - `username`

---

#### **GET /api/users/:username**

Responds with:

- a user object which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

#### **PATCH /api/comments/:comment_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current comment's vote property by 1

  `{ inc_votes : -1 }` would decrement the current comment's vote property by 1

Responds with:

- the updated comment

---

### _Even more_ endpoints/tasks

#### Adding pagination to GET /api/articles - adding pagination

> To make sure that an API can handle large amounts of data, it is often necessary to use **pagination**. Head over to [Google](https://www.google.co.uk/search?q=cute+puppies), and you will notice that the search results are broken down into pages. It would not be feasible to serve up _all_ the results of a search in one go. The same is true of websites / apps like Facebook or Twitter (except they hide this by making requests for the next page in the background, when we scroll to the bottom of the browser). We can implement this functionality on our `/api/articles` and `/api/comments` endpoints.

- Should accepts the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (**this should display the total number of articles with any filters applied, discounting the limit**)

---

#### Adding pagination to GET /api/articles/:article_id/comments

Should accept the following queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

---

#### POST /api/articles

Request body accepts:

- an object with the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `body`
  - `topic`

Responds with:

- the newly added article, with all the above properties as well as:
  - `article_id`
  - `votes`
  - `created_at`
  - `comment_count`

#### POST /api/topics

Request body accepts:

- an object in the form:

```json
{
  "slug": "topic name here",
  "description": "description here"
}
```

Responds with:

- a topic object containing the newly added topic

#### DELETE /api/articles/:article_id

Should:

- delete the given article by article_id

Respond with:

- status 204 and no content
