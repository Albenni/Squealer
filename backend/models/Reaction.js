const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  squealId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Conversation",
    required: true,
  },
  reactionType: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3],
  },
});

module.exports = mongoose.model("Reaction", reactionSchema);
