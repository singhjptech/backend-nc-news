const express = require("express");
const apiRouter = express.Router();
const getEndpoints = require("../controllers/api.controllers");

apiRouter.get("/api", getEndpoints);

module.exports = apiRouter;
