const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { profileImage } = require("../middleware/uploadMiddleware");

/**
 * @description To get all user
 * @api /user
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/", userController.getAllUsers);

/**
 * @description To get all user
 * @api /user/:id
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/:id", userController.getUserById);

/**
 * @description To get all user
 * @api /user/:id
 * @access PUBLIC
 * @type PUT
 * @return response
 */
router.put("/:id", userController.updateUserById);

/**
 * @description To get all user
 * @api /user/:id
 * @access PUBLIC
 * @type DELETE
 * @return response
 */
router.delete("/:id", userController.deleteUserById);

module.exports = router;
