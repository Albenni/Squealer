const mongoose = require("mongoose");
const Follower = require("../models/Follower");
const Channel = require("../models/Channel");
const Keyword = require("../models/Keyword");
const User = require("../models/User");

const followChannel = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID not valid" });

  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(400).json({ message: "Channel not found" });

  const alreadyFollowed = await Follower.findOne({
    followingUserId: req.params.userId,
    followedId: req.params.channelId,
    followedType: "Channel",
  });
  if (alreadyFollowed)
    return res.status(400).json({ message: "Channel already followed" });

  try {
    const result = await Follower.create({
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

const followKeyword = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.body?.keywordId))
    return res.status(400).json({ message: "Channel ID not valid" });

  const keyword = await Keyword.findById(req.body.keywordId);
  if (!keyword) return res.status(400).json({ message: "Keyword not found" });

  try {
    const result = await Follower.create({
      followingUserId: req.params.userId,
      followedId: req.body.keywordId,
      followedType: "Keyword",
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const unfollowKeyword = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.keywordId))
    return res.status(400).json({ message: "Keyword ID not valid" });

  try {
    const result = await Follower.findOneAndDelete({
      followingUserId: req.params.userId,
      followedId: req.params.keywordId,
      followedType: "Keyword",
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const followUser = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.followedId))
    return res.status(400).json({ message: "Keyword ID not valid" });

  const user = await User.findById(req.params.followedId);
  if (!user) return res.status(400).json({ message: "User not found" });

  try {
    const result = await Follower.create({
      followingUserId: req.params.userId,
      followedId: req.params.followedId,
      followedType: "User",
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const unfollowUser = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.followedId))
    return res.status(400).json({ message: "Keyword ID not valid" });

  try {
    const result = await Follower.findOneAndDelete({
      followingUserId: req.params.userId,
      followedId: req.params.followedId,
      followedType: "User",
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
  followKeyword,
  unfollowKeyword,
  followUser,
  unfollowUser,
};
