const mongoose = require("mongoose");
const Follower = require("../models/Follower");
const Channel = require("../models/Channel");

const followChannel = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.body?.channelId))
    return res.status(400).json({ message: "Channel ID not valid" });

  const channel = await Channel.findById(req.body.channelId);
  if (!channel) return res.status(400).json({ message: "Channel not found" });

  try {
    const result = await Follower.create({
      followingUserId: req.id,
      followedId: req.body.channelId,
      followedType: "Channel",
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const unfollowChannel = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID not valid" });

  try {
    const result = await Follower.findOneAndDelete({
      followingUserId: req.params.userId,
      followedId: req.params.channelId,
      followedType: "Channel",
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

module.exports = {
  followChannel,
  unfollowChannel,
};
