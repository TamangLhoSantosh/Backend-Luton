const express = require("express");
const router = express.Router();
const roomController = require("../controllers/RoomController");

/**
 * @description To create a new room
 * @api /room
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", roomController.createRoom);

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
router.put("/:id", roomController.updateRoomById);

/**
 * @description To delete room
 * @api /room/:id
 * @access PUBLIC
 * @type DELETE
 * @return response
 */
router.delete("/:id", roomController.deleteRoomById);

module.exports = router;
