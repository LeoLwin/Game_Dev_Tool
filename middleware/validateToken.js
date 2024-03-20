require("dotenv").config();
const jwt = require("jsonwebtoken");
const StatusCode = require("../helper/status_code_helper");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json(
            new StatusCode.UNAUTHENTICATED("User is not authorized!")
          );
        }
        req.user = decoded.user;
        next();
      });
    } else {
      return res.json(
        new StatusCode.UNAUTHENTICATED(
          "User is not authorized or token is missing!"
        )
      );
    }
  } catch (err) {
    return new StatusCode.UNKNOWN(err);
  }
};

module.exports = validateToken;
