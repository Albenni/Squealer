const mongoose = require("mongoose");
const Channel = require("../models/Channel");
const Admin = require("../models/Admin");
const Squeal = require("../models/Squeal");

const createChannel = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!req?.body?.channelName)
    return res.status(400).json({ message: "Channel name required" });

  const channel = await Channel.findOne({ name: req.body.channelName });
  if (channel) return res.status(400).json({ message: "Channel name taken" });

  const newChannel = {
    name: req.body.channelName,
    private: req?.body?.channelPrivate === "true",
  };

  //bisogna creare il documento Admin, che rappresenta il fatto che questo utente è admin del canale creato

  try {
    const result = await Channel.create(newChannel);
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

const searchChannels = async (req, res) => {
  try {
    const findChannels = req.query.channel ? req.query.channel : "";
    const channels = await Channel.find({
      name: { $regex: ".*" + findChannels + ".*" },
    }).select("-__v");
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
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID required" });

  const channel = await Channel.findById({ _id: req.params.channelId }).exec();
  if (!channel) {
    return res
      .status(204)
      .json({ message: `Channel ID ${req.params.channelId} not found` });
  }

  const admin = await Admin.find({
    userId: req.id,
    channelId: req.params.channelId,
  });
  if (!admin) return res.status(403).json({ message: "Permission denied" });

  Channel.deleteOne({ _id: req.params.channelId });
  Squeal.deleteMany({
    channel: req.params.channelId,
    channelSqueal: true,
  });
  Admin.deleteMany({ channelId: req.params.channelId });
  return res.status(200);
};

module.exports = {
  createChannel,
  searchChannels,
  getChannelById,
  deleteChannel,
};
