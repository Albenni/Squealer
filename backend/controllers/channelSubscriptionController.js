const mongoose = require("mongoose");
const ChannelSubscription = require("../models/ChannelSubscription");
const Channel = require("../models/Channel");

const followChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID not valid" });

  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(400).json({ message: "Channel not found" });

  try {
    const result = await ChannelSubscription.create({
      userId: req.id,
      channelId: req.params.channelId,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const unfollowChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID not valid" });

  try {
    const result = await ChannelSubscription.findOneAndDelete({
      userId: req.params.userId,
      channelId: req.params.channelId,
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
