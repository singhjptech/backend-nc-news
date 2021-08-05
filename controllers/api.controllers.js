const getEndpoints = (req, res, next) => {
  res.status(200).send({ msg: "all is well inside controller" });
};

module.exports = getEndpoints;
