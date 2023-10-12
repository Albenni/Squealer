const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  squealId: {
    type: String,
    enum: ["Public", "Channel", "Keyword"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  //   contentType: {
  //     type: String,
  //     required: true,
  //     enum: {
  //       values: ["text", "image", "video", "geolocalization"],
  //       message: "{VALUE} is not supported",
  //     },
  //   },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
