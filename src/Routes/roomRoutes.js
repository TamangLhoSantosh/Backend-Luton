const express = require("express");
const router = express.Router();
const roomController = require("../controllers/RoomController");
const auth = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To create a new room
 * @api /room
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", auth, authorizeRole("admin"), roomController.createRoom);

/**
 * @description To get all rooms
 * @api /room
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/", roomController.getAllRooms);

/**
 * @description To get specific room
 * @api /room/:id
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/:id", roomController.getRoomById);

/**
 * @description To update room
 * @api /room/:id
 * @access PUBLIC
 * @type PUT
 * @return response
 */
router.put("/:id", auth, authorizeRole("admin"), roomController.updateRoomById);

/**
 * @description To delete room
 * @api /room/:id
 * @access PUBLIC
 * @type DELETE
 * @return response
 */
router.delete(
  "/:id",
  auth,
  authorizeRole("admin"),
  roomController.deleteRoomById
);

module.exports = router;
