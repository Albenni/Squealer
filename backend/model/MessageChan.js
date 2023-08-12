const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageChanSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  channel: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    refPath: "channelType", //può essere canale user oppure redazione
  },
  channelType: {
    type: String,
    required: true,
    enum: ["ChannelUser", "ChannelRed"],
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

module.exports = mongoose.model("MessageChan", messageChanSchema);
