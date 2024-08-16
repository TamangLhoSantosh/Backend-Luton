const Room = require("../models/Room");

// Create a new room
const createRoom = async (req, res) => {
  try {
    // Check if room already exists
    let room = await Room.findOne({ roomNumber: req.body.roomNumber });
    if (room) {
      return res.status(400).json({ error: "Room already exists" });
    }

    room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const filters = {};

    // Extract filters from query parameters
    if (req.query.roomType) {
      filters.roomType = req.query.roomType;
    }
    if (req.query.roomNumber) {
      filters.roomNumber = req.query.roomNumber;
    }
    if (req.query.availability) {
      filters.availability = req.query.availability;
    }

    // Find rooms based on filters and populate the roomType
    const rooms = await Room.find(filters).populate("roomType");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a room by ID
const updateRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a room by ID
const deleteRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
