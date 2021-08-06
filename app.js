const express = require("express");
const apiRouter = require("./routes/api.router");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handle404,
  handleInternalServerErrors,
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle404);
app.use(handleInternalServerErrors);

module.exports = app;
