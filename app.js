const express = require("express");
const apiRouter = require("./routes/api.router");

const app = express();

app.use("/", apiRouter);

app.use(express.json());

module.exports = app;
