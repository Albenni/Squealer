const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  conversation: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Conversation",
  },
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    enum: {
      values: ["text", "picture", "video", "geolocalization"],
      message: "{VALUE} is not supported",
    },
  },
  positiveReaction: {
    type: Number,
    default: 0,
  },
  negativeReaction: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Message", messageSchema);
