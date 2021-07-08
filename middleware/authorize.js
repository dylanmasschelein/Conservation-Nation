const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send("Please login");
  }
  // comment

  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }

    req.decoded = decoded;
    next();
  });
};
