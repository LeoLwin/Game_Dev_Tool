require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.Auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized request");
  }
  let token = authHeader.replace("Bearer ", "");
  try {
    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");
    let verifiedUser = jwt.verify(token, process.env.JWT_KEY);
    if (!verifiedUser) return res.status(401).send("Unauthorized request");
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
