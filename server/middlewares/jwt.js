const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  let token = req.headers["authorization"] || req.headers["Authorization"];
  console.log("Token is");
  console.log(token);

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        console.log("Error is ", err.name);
        console.log("Error message is ", err.message);
        res.json({
          succes: false,
          message: "Error token not authenticated or expired",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      succes: false,
      message: "Token not found",
    });
  }
};
