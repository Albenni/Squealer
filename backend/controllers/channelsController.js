const mongoose = require("mongoose");
const Channel = require("../models/Channel");

const followChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.body?.channelId))
    return res.status(400).json({ message: "Channel ID required" });

  const channel = await Channel.findById(req.body.channelId);
  if (!channel) return res.status(400).json({ message: "Channel not found" });

  try {
    await User.findByIdAndUpdate(req.id, {
      $push: {
        subscribedChannel: channel._id,
      },
    });
    res.status(200);
  } catch (error) {
    res.json({ message: error });
  }
};

const createChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.body?.channelName))
    return res.status(400).json({ message: "Channel name required" });

  const channel = await Channel.find(req.body.channelName);
  if (channel) return res.status(400).json({ message: "Channel name taken" });

  try {
    Channel.create({
      name: req.body.channelName,
      channelAdmin: req.id,
      private: false,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const searchChannels = async (req, res) => {
  // const channels = await Channel.find();
  // res.json(channels);
  try {
    const findChannels = req.query.channel ? req.query.channel : "";
    const channels = await Channel.find({
      name: { $regex: ".*" + findChannels + ".*" },
    });
    if (!channels) return res.status(204).json({ message: "No users found" });
    res.json(channels);
  } catch (error) {
    res.json({ message: error });
  }
};

const getChannelById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Channel ID required" });
  const channel = await Channel.findById({ _id: req.params.id }).exec();
  if (!channel?.length) {
    return res
      .status(204)
      .json({ message: `Channel ID ${req.body.id} not found` });
  }
  res.status(200).json(channel);
};

const deleteChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Channel ID required" });
  const channel = await Channel.findById({ _id: req.params.id }).exec();
  if (!channel?.length) {
    return res
      .status(204)
      .json({ message: `Channel ID ${req.body.id} not found` });
  }
  const result = await Channel.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = {
  followChannel,
  createChannel,
  searchChannels,
  getChannelById,
  deleteChannel,
};
