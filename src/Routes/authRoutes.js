const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthController");
const { profileImage } = require("../middleware/uploadMiddleware");

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

module.exports = router;
