const User = require("../models/User");

function authorizeRole(...role) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.sendStatus(404); // User not found
      }

      const userRole = String(user.role).trim();
      const requiredRole = String(role).trim();

      if (requiredRole.includes(userRole)) {
        return res.sendStatus(403); // Forbidden if user does not have the required role
      }

      next();
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
}

module.exports = { authorizeRole };
