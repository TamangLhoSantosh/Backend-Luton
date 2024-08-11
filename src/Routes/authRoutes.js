const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthController");
const { profileImage } = require("../middleware/uploadMiddlewar");

/**
 * @description To create users
 * @api /register
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/register", profileImage.single("profileImage"), registerUser);

/**
 * @description To login  users
 * @api /login
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/login", loginUser);

module.exports = router;
