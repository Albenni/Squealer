const mongoose = require("mongoose");
const Channel = require("../models/Channel");

const createChannel = async (req, res) => {
  if (!req?.body?.channelName)
    return res.status(400).json({ message: "Channel name required" });

  const channel = await Channel.findOne({ name: req.body.channelName });
  if (channel) return res.status(400).json({ message: "Channel name taken" });

  const newChannel = {
    name: req.body.channelName,
    channelAdmin: req.id,
    private: req?.body?.channelPrivate === "true",
  };

  try {
    const result = await Channel.create(newChannel);
    res.json(result);
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
    }).select("-__v -channelAdmin");
    if (!channels) return res.status(204).json({ message: "No users found" });
    res.json(channels);
  } catch (error) {
    res.json({ message: error });
  }
};

const getChannelById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID required" });

  const channel = await Channel.findById(req.params.channelId).exec();
  if (!channel) {
    return res.status(204).json({ message: "Channel not found" });
  }
  res.status(200).json(channel);
};

const deleteChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID required" });

  const channel = await Channel.findById({ _id: req.params.channelId }).exec();
  if (!channel) {
    return res
      .status(204)
      .json({ message: `Channel ID ${req.params.channelId} not found` });
  }

  if (!channel.channelAdmin.includes(req.id))
    return res.status(403).json({ message: "Permission denied" });

  const result = await Channel.deleteOne({ _id: req.params.channelId });
  res.json(result);
};

module.exports = {
  createChannel,
  searchChannels,
  getChannelById,
  deleteChannel,
};
