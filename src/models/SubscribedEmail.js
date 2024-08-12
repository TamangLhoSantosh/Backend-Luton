const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscribedEmailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const SubscribedEmail = mongoose.model(
  "SubscribedEmail",
  subscribedEmailSchema
);
module.exports = SubscribedEmail;
