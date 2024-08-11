const RoomType = require("../models/RoomType");

// Create a new room type
const createRoomType = async (req, res) => {
  const { roomType, pricePerNight } = req.body;
  try {
    const newRoomType = new RoomType({
      roomType,
      pricePerNight,
    });
    await newRoomType.save();
    res.status(201).json(newRoomType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all room types
const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single room type by ID
const getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType)
      return res.status(404).json({ message: "RoomType not found" });
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a room type by ID
const updateRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!roomType)
      return res.status(404).json({ message: "RoomType not found" });
    res.status(200).json(roomType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a room type by ID
const deleteRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findByIdAndDelete(req.params.id);
    if (!roomType)
      return res.status(404).json({ message: "RoomType not found" });
    res.status(200).json({ message: "RoomType deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType,
};
