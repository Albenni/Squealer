const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const privateConversationSchema = new Schema({
  user1: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model(
  "PrivateConversation",
  privateConversationSchema
);
