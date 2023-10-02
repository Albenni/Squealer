const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Channel", channelSchema);
