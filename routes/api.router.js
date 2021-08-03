const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: " all ok in the router " });
});

module.exports = apiRouter;
