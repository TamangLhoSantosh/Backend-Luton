const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
    unique: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
});

const RoomType = mongoose.model("RoomType", roomTypeSchema);
module.exports = RoomType;
