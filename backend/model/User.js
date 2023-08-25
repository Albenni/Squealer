const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  vip: {
    type: Boolean,
    default: false,
  },
  conversations: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PrivateConversation",
    },
  ],
  subscribedChannel: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Channel",
    },
  ],
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", userSchema);
