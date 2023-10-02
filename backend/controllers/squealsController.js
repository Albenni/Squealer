const mongoose = require("mongoose");
const User = require("../models/User");
const constants = require("../config/constants");
const Squeal = require("../models/Squeal");

//solo quelli pubblici
const getAllUserSqueals = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "Invalid user ID" });

  const squeals = await Squeal.find({
    author: req.params.userId,
    channelSqueal: false,
  }).exec();

  if (!squeals?.length)
    return res.status(204).json({ message: "No squeals found" });

  res.json(squeals);
};

const getAllSquealsInChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Invalid channel ID" });

  const squeals = await Squeal.find({
    channel: req.params.channelId,
    channelSqueal: true,
  }).exec();

  if (!squeals?.length) {
    return res.status(204).json({ message: `No squeals found` });
  }

  res.json(squeals);
};

const createSqueal = async (req, res) => {
  if (!req.authorized) return res.status(403);

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

  const messLength =
    req.body.contentType === "text"
      ? req.body.content.length
      : constants.MEDIA_CHAR_DIMENSION;

  //controllo che ci siano abbastanza caratteri disponibili
  if (author.charAvailable < messLength)
    return res.status(400).json({ message: "Not enough character available" });
  // } else return res.status(400).json({ message: "Content type not accepted" });

  const isChannelSqueal = req?.body?.channelSqueal === "true";

  const squeal = isChannelSqueal
    ? {
        author: req.params.userId,
        content: req.body.content,
        contentType: req.body.contentType,
        channelSqueal: isChannelSqueal,
        channel: req.body.channel,
        officialChannel: req?.body?.officialChannel ? true : false, //bisogna settarlo solo quando si invia un messaggio in un canale ufficiale
      }
    : {
        author: req.params.userId,
        content: req.body.content,
        contentType: req.body.contentType,
        channelSqueal: isChannelSqueal,
      };
  try {
    const result = await Squeal.create(squeal);
    // author.update({ charAvailable: author.charAvailable - messLength });
    // author.save();
    await User.findByIdAndUpdate(req.params.userId, {
      charAvailable: author.charAvailable - messLength,
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

const deleteSqueal = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  try {
    const result = await Squeal.findByIdAndDelete(req.params.squealId);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
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
