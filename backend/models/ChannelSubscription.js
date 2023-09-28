const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSubscriptionSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  channel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Channel",
    required: true,
  },
});

module.exports = mongoose.model(
  "ChannelSubscription",
  channelSubscriptionSchema
);
