const express = require("express");
const router = express.Router();
const roomTypeController = require("../controllers/RoomTypeController");

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
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", roomTypeController.createRoomType);

/**
 * @description To update a room type by ID
 * @api /room-types/:id
 * @access PUBLIC
 * @type PUT
 * @return response
 */
router.put("/:id", roomTypeController.updateRoomType);

/**
 * @description To delete a room type by ID
 * @api /room-types/:id
 * @access PUBLIC
 * @type DELETE
 * @return response
 */
router.delete("/:id", roomTypeController.deleteRoomType);

module.exports = router;
