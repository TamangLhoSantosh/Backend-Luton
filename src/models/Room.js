const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
