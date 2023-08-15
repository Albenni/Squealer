const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.SchemaTypes.ObjectId,
    refPath: "receiverType",
    required: true,
  },
  receiverType: {
    type: String,
    required: true,
    enum: {
      values: ["User", "Moderator"],
      message: "{VALUE} is not supported",
    },
  },
  content: {
    type: String,
    required: true,
  },
  //"text", "picture", "geolocalization"
  //le immagini e le geolocalizz vengono salvate come link e poi sostituite nel frontend
  //idee migliori???
  contentType: {
    type: String,
    required: true,
    enum: {
      values: ["text", "picture", "geolocalization"],
      message: "{VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  lastEdited: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Message", messageSchema);
