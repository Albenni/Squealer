const mongoose = require("mongoose");
const Channel = require("../models/Channel");
const Admin = require("../models/Admin");
const Squeal = require("../models/Squeal");
const User = require("../models/User");

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

  try {
    const result = await Channel.create(newChannel);
    //creo l'admin del canale
    await Admin.create({
      userId: req.id,
      channelId: result._id,
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

const updateProfilePic = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID invalid" });

  const { newprofilepicture } = req.body;

  if (!newprofilepicture)
    return res.status(400).json({ message: "Missing profile picture" });

  // Controllo che l'immagine sia valida (il MIME type deve essere image)
  let isValid = false;
  await fetch(newprofilepicture).then((res) => {
    const contentType = res.headers.get("content-type");
    isValid = contentType?.startsWith("image");
  });

  if (!isValid) return res.status(400).json({ message: "Invalid image" });

  try {
    // Aggiorno e ritorno il canale aggiornato
    const result = await Channel.findByIdAndUpdate(
      req.params.userId,
      { profilePic: newprofilepicture },
      { new: true }
    ).exec();

    if (!result) return res.status(404).json({ message: "Channel not found" });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

const searchChannels = async (req, res) => {
  try {
    const findChannels = req.query.channel ? req.query.channel : "";
    if (req?.query?.exactMatch) {
      if (!findChannels)
        return res
          .status(400)
          .json({ message: "Channel name required for exact match" });
      const channel = await Channel.findOne({ name: findChannels });
      if (!channel)
        return res.status(204).json({ message: "No channels found" });
      return res.json(channel);
    } else {
      const query = req.query.editorial
        ? {
            name: { $regex: ".*" + findChannels + ".*" },
            editorialChannel: true,
          }
        : {
            name: { $regex: ".*" + findChannels + ".*" },
          };

      const channels = await Channel.find(query).select("-__v");
      if (!channels)
        return res.status(204).json({ message: "No channels found" });
      res.json(channels);
    }
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
    group: req.params.channelId,
    squealType: "Channel",
  });
  Admin.deleteMany({ channelId: req.params.channelId });
  return res.status(200);
};

const addAdmin = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID required" });
  if (!mongoose.Types.ObjectId.isValid(req?.body?.adminId))
    return res.status(400).json({ message: "Channel ID required" });

  const channel = await Channel.findById(req.params.channelId).exec();
  if (!channel) {
    return res.status(404).json({ message: "Channel ID not found" });
  }
  const user = await User.findById(req.body.adminId).exec();
  if (!user) {
    return res.status(404).json({ message: "Admin ID not found" });
  }

  try {
    const admin = await Admin.create({
      userId: req.body.adminId,
      channelId: req.params.channelId,
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeAdmin = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Channel ID required" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.adminId))
    return res.status(400).json({ message: "Channel ID required" });

  try {
    const admin = await Admin.findOneAndDelete({
      userId: req.params.adminId,
      channelId: req.params.channelId,
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const blockSblock = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!req?.isMod)
    return res.status(403).json({ message: "You are not moderator" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    const channel = await Channel.findById(req.params.channelId);
    channel.blocked = !channel?.blocked;
    channel.save();

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  createChannel,
  updateProfilePic,
  searchChannels,
  getChannelById,
  deleteChannel,
  addAdmin,
  removeAdmin,
  blockSblock,
};
