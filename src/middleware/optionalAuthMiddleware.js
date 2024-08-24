const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.user;
  next();
};

module.exports = optionalAuth;
