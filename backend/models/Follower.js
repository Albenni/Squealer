const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema({
  followingUserId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  followedId: {
    type: mongoose.SchemaTypes.ObjectId,
    refPath: "followedType",
    required: true,
  },
  followedType: {
    type: String,
    enum: ["User", "Channel", "Keyword"],
    required: true,
  },
});

module.exports = mongoose.model("Follower", followerSchema);
