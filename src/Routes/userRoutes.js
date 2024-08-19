const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { profileImage } = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To get all user
 * @api /user
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/",
  auth,
  authorizeRole("admin", "staff"),
  userController.getAllUsers
);

/**
 * @description To get all user
 * @api /user/search
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/search",
  auth,
  authorizeRole("admin", "staff"),
  userController.searchUser
);

/**x
 * @description To get all user
 * @api /user/:id
 * @access AUTHENTICATED USERS
 * @type GET
 * @return response
 */
router.get("/:id", auth, userController.getUserById);

/**
 * @description To get all user
 * @api /user/:id
 * @access AUTHENTICATED USERS
 * @type PUT
 * @return response
 */
router.put("/:id", auth, userController.updateUserById);

/**
 * @description To get all user
 * @api /user/:id
 * @access AUTHENTICATED USERS
 * @type DELETE
 * @return response
 */
router.delete("/:id", auth, userController.deleteUserById);

module.exports = router;
