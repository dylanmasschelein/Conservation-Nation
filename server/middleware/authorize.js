const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  /*
   * JWT will be part of the header
   * format of header: { authorization: `Bearer ${authToken}` }
   *
   */
  if (!req.headers.authorization) {
    return res.status(400).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  // verify the jwt
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }

    req.decoded = decoded;
    next();
  });
};
