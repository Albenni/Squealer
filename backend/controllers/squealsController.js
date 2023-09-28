const mongoose = require("mongoose");
const User = require("../models/User");
const constants = require("../constants");
const Squeal = require("../models/Squeal");

//solo quelli pubblici
const getAllUserSqueals = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "Invalid user ID" });

  const squeals = await Squeal.find({
    author: req.params.userId,
    publicSqueal: true,
  }).exec();

  if (!squeals?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(squeals);
};

const getAllSquealsInChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Invalid channel ID" });

  const messages = await Squeal.find({
    channel: req.params.channelId,
    publicSqueal: false,
  }).exec();

  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

const createSqueal = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "Author ID not valid" });
  if (!req?.body?.content)
    return res.status(400).json({ message: "Body message required" });
  if (!req?.body?.contentType)
    return res.status(400).json({ message: "Content type required" });

  if (req?.body?.channelSqueal)
    if (!mongoose.Types.ObjectId.isValid(req?.body?.channel))
      return res.status(400).json({ message: "Conversation ID not valid" });

  const author = await User.findById(req.params.userId).select("charAvailable");
  //controlliamo che l'autore del messaggio esista
  if (!author) return res.status(400).json({ message: "Author not found" });

  //controllo che ci siano abbastanza caratteri disponibili
  if (
    contentType === "picture" ||
    contentType === "video" ||
    contentType === "geolocalization"
  ) {
    if (author.charAvailable < constants.MEDIA_CHAR_DIMENSION)
      return res
        .status(400)
        .json({ message: "Not enough character available" });
  } else if (contentType === "text") {
    if (author.charAvailable < req.body.content.length)
      return res
        .status(400)
        .json({ message: "Not enough character available" });
  } else return res.status(400).json({ message: "Content type not accepted" });

  const squeal = req?.body?.channelSqueal
    ? {
        author: req.body.userId,
        content: req.body.content,
        contentType: req.body.contentType,
        channelSqueal: req?.body?.channelSqueal,
      }
    : {
        author: req.body.userId,
        content: req.body.content,
        contentType: req.body.contentType,
        channelSqueal: req?.body?.channelSqueal,
        channel: req.body.channel,
      };
  try {
    const result = await Squeal.create(squeal);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const deleteSqueal = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  try {
    const result = await Squeal.findByIdAndDelete(req.params.squealId);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const addSquealReactions = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  // const result = await Squeal.findById(req.params.squealId).select(
  //   "positiveReaction negativeReaction"
  // );

  // if (!reactions) return res.status(204).json({ message: `Squeal not found` });

  // res.status(200).json(reactions);
};

module.exports = {
  getAllUserSqueals,
  getAllSquealsInChannel,
  createSqueal,
  deleteSqueal,
  addSquealReactions,
};
