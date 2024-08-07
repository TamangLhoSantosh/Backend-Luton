const express = require("express");
const router = express.Router();
const roomController = require("../controllers/RoomController");

// Create a new room
// POST /rooms
router.post("/", roomController.createRoom);

// Get all rooms
// GET /rooms
router.get("/", roomController.getAllRooms);

// Get a room by ID
// GET /rooms/:id
router.get("/:id", roomController.getRoomById);

// Update a room by ID
// PUT /rooms/:id
router.put("/:id", roomController.updateRoomById);

// Delete a room by ID
// DELETE /rooms/:id
router.delete("/:id", roomController.deleteRoomById);

module.exports = router;
