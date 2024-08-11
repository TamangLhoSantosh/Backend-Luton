const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = Schema({
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
