const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const optionalAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return next();

  // Extract the token from the header
  const token = authHeader.replace("Bearer ", "");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.user;
  next();
};

module.exports = optionalAuth;
