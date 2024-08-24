const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "booked", "checked-in", "checked-out", "cancelled"],
    default: "open",
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
