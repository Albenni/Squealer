const mongoose = require("mongoose");
const Channel = require("../model/Channel");

const getAllChannels = async (req, res) => {
  const channels = await Channel.find();
  res.json(channels);
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
  return channel;
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
  getAllChannels,
  getChannelById,
  deleteChannel,
};
