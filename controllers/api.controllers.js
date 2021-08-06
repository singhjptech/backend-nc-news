const getEndpoints = (req, res, next) => {
  res.status(200).send(endpoints);
};

const endpoints = {
  "GET /api": {
    description: "serves as endpoint for all the available points",
  },
};

module.exports = { getEndpoints, endpoints };
