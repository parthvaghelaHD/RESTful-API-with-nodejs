const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    jwt.verify(bearerHeader, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.status(403).json({
          message: err
        });
      } else {
        res.status(200).json({
          message: "Token verified",
          auth: authData
        });
      }
    });
    next();
  } else {
    return res.status(500).json({
      message: "invalid verification token"
    });
  }
}

module.exports = { verifyToken };
