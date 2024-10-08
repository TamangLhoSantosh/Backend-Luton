const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true,
  },
  roomNumber: {
    type: String,
    unique: true,
    required: true,
  },
  availability: {
    type: String,
    default: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
