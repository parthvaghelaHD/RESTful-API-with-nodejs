const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {

    jwt.verify(bearerHeader, process.env.SECRET_KEY, function(err, decoded)  {
      if (err) {
        return res.status(500).json({
          message: "invalid verification token"
        });
      } else {
        return res.status(200).json({
          message: "verification token",
          decoded
        });
        next();
      }
    });
  } else {
    return res.status(500).json({
      message: "invalid verification token"
    });
  }
}

module.exports = { verifyToken };