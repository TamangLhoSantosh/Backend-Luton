const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
