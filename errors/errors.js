const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handleInternalServerErrors = (err, req, res, next) => {
  console.log(err, "<<< Internal server error, needs to be resolved");
  res.status(500).send({ msg: "Internal server error!" });
};

const send404 = (req, res, next) => {
  res.status(404).send({ msg: "route not found" });
};

module.exports = {
  handleCustomErrors,
  handleInternalServerErrors,
  send404,
};
