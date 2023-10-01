const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const squealSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  channel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Channel",
  },
  channelSqueal: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    enum: {
      values: ["text", "image", "video", "geolocalization"],
      message: "{VALUE} is not supported",
    },
  },
  impression: {
    type: Number,
    default: 0,
  },
  //contano solo le reaction degli utenti non registrati
  //le reaction degli utenti registrati sono salvate nel modello Reaction
  positiveAnonReaction: {
    type: Number,
    default: 0,
  },
  negativeAnonReaction: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Squeal", squealSchema);
