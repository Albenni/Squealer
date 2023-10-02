const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema({
  followingUserId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  followedUserId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Channel",
    required: true,
  },
});

module.exports = mongoose.model("Follower", followerSchema);
