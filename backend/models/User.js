const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  professional: {
    type: Boolean,
    default: false,
  },
  charAvailable: {
    type: Number,
    min: [0, "Not enough character available"],
    default: 1000,
  },
  profilePic: {
    type: String,
  },
  // conversations: [
  //   {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "Conversation",
  //   },
  // ],
  userFollowed: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  // subscribedChannel: [
  //   {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "Channel",
  //   },
  // ],
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", userSchema);
