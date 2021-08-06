const getEndpoints = (req, res, next) => {
  res
    .status(200)
    .send({ msg: "serves as endpoint for all the available points" });
};

module.exports = { getEndpoints };
