const mongoose = require("mongoose");
const Channel = require("../models/Channel");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Squeal = require("../models/Squeal");
const Follower = require("../models/Follower");

const createChannel = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!req?.body?.channelName)
    return res.status(400).json({ message: "Channel name required" });

  const channel = await Channel.findOne({ name: req.body.channelName });
  if (channel) return res.status(400).json({ message: "Channel name taken" });

  const newChannel = req.body?.description
    ? {
        name: req.body.channelName,
        private: req?.body?.channelPrivate === "true",
        editorialChannel: req.body?.editorialChannel == "true",
      }
    : {
        name: req.body.channelName,
        private: req?.body?.channelPrivate === "true",
        editorialChannel: req.body?.editorialChannel == "true",
        description: req.body.description,
      };

  try {
    const result = await Channel.create(newChannel);
    //creo l'admin del canale
    if (!newChannel.editorialChannel) {
      await Admin.create({
        userId: req.id,
        channelId: result._id,
      });
    }
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

const updateProfilePic = async (req, res) => {
  if (!req.authorized) return res.status(403);

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
      let result = new Array(channels.length);

      for (let index = 0; index < channels.length; index++) {
        const admins = await Admin.find({
          channelId: channels[index]._id,
        })
          .select("userId -_id")
          .populate("userId", "username");
        const numSqueal = await Squeal.count({
          "receivers.group": { $in: channels[index]._id },
        });
        const numFollower = await Follower.count({
          followedId: channels[index]._id,
          followedType: "Channel",
        });
        result[index] = {
          blocked: channels[index].blocked,
          _id: channels[index]._id,
          name: channels[index].name,
          private: channels[index].private,
          editorialChannel: channels[index].editorialChannel,
          createdAt: channels[index].createdAt,
          description: channels[index].description,
          admins,
          numSqueal,
          numFollower,
        };
      }

      if (!channels)
        return res.status(204).json({ message: "No channels found" });
      res.json(result);
    }
  } catch (error) {
    console.log(error);
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
  const admins = await Admin.find({
    channelId: channel._id,
  })
    .select("userId -_id")
    .populate("userId", "username");
  const numSqueal = await Squeal.count({
    "receivers.group": { $in: channel._id },
  });
  const numFollower = await Follower.count({
    followedId: channel._id,
    followedType: "Channel",
  });

  const result = {
    blocked: channel.blocked,
    _id: channel._id,
    name: channel.name,
    private: channel.private,
    editorialChannel: channel.editorialChannel,
    createdAt: channel.createdAt,
    description: channel.description,
    admins,
    numSqueal,
    numFollower,
  };
  res.status(200).json(result);
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

  if (!req.isMod) {
    const admin = await Admin.find({
      userId: req.id,
      channelId: req.params.channelId,
    });
    if (!admin) return res.status(403).json({ message: "Permission denied" });
  }

  await Channel.deleteOne({ _id: req.params.channelId });
  await Admin.deleteMany({ channelId: req.params.channelId });
  return res.status(200).json({ message: "channel deleted" });
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
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const changeName = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    const name = req.body.name;
    if (!name) return res.status(400).json({ message: "Name required" });

    await Channel.findByIdAndUpdate(req.params.channelId, { name: name });
    res.status(200).json({ message: "nome aggiornato con successo" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const changeDescription = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    const description = req.body.description;

    if (!description)
      return res.status(400).json({ message: "Description required" });
    await Channel.findByIdAndUpdate(req.params.channelId, {
      description: description,
    });
    res.status(200).json({ message: "descrizione aggiornata con successo" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
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
  changeName,
  changeDescription,
};
