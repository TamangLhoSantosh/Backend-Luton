const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  guestPhone: {
    type: String,
  },
});

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
