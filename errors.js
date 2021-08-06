const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "42601" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

const handle404 = (req, res, next) => {
  res.status(404).send({ msg: "route not found" });
};

const handleInternalServerErrors = (err, req, res, next) => {
  console.log(err, "<<< Internal server error, needs to be resolved");
  res.status(500).send({ msg: "Internal server error!" });
};

module.exports = {
  handleCustomErrors,
  handlePSQLErrors,
  handle404,
  handleInternalServerErrors,
};