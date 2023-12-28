const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  //può essere un canale gestito da utenti oppure dalla redazione
  editorialChannel: {
    type: Boolean,
    required: true,
    default: false,
  },
  profilePic: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Channel", channelSchema);
