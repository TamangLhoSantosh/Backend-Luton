const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserFromToken,
} = require("../controllers/AuthController");
const { profileImage } = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");

/**
 * @description To create users
 * @api /auth/register
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/register", profileImage.single("profileImage"), registerUser);

/**
 * @description To login  users
 * @api /auth/login
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/login", loginUser);

/**
 * @description To get user from the token
 * @api /auth/getUser
 * @access AUTHENTICATED USERS
 * @type POST
 * @return response
 */
router.post("/getUser", auth, getUserFromToken);

module.exports = router;
