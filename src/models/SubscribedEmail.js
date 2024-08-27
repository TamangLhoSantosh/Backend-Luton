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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const SubscribedEmail = mongoose.model(
  "SubscribedEmail",
  subscribedEmailSchema
);
module.exports = SubscribedEmail;
