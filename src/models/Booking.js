const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["booked", "checked-in", "checked-out", "cancelled"],
    default: "booked",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
