const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  channelAdmin: {
    type: [mongoose.SchemaTypes.ObjectId],
    refPath: "adminType",
  },
  //può essere un canale gestito da utenti oppure dalla redazione
  adminType: {
    type: String,
    required: true,
    enum: {
      values: ["User", "Moderator"],
      message: "{VALUE} is not supported",
    },
  },
  editorialChannel: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Channel", channelSchema);
