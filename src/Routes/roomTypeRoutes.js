const express = require("express");
const router = express.Router();
const roomTypeController = require("../controllers/RoomTypeController");
const auth = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To get all room types
 * @api /room-types
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/", roomTypeController.getAllRoomTypes);

/**
 * @description To get a specific room type by ID
 * @api /room-types/:id
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/:id", roomTypeController.getRoomTypeById);

/**
 * @description To create a new room type
 * @api /room-types
 * @access ADMIN
 * @type POST
 * @return response
 */
router.post(
  "/",
  auth,
  authorizeRole("admin"),
  roomTypeController.createRoomType
);

/**
 * @description To update a room type by ID
 * @api /room-types/:id
 * @access ADMIN
 * @type PUT
 * @return response
 */
router.put(
  "/:id",
  auth,
  authorizeRole("admin"),
  roomTypeController.updateRoomType
);

/**
 * @description To delete a room type by ID
 * @api /room-types/:id
 * @access ADMIN
 * @type DELETE
 * @return response
 */
router.delete(
  "/:id",
  auth,
  authorizeRole("admin"),
  roomTypeController.deleteRoomType
);

module.exports = router;
