const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  channelId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Channel",
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
