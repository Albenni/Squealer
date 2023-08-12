const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
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

module.exports = mongoose.model("Post", postSchema);
