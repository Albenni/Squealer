const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Message");
const constants = require("../constants");

const getAllMessagesInConversation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.convId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const messages = await Message.find({
    conversation: req.params.convId,
    conversationType: "Conversation",
  }).exec();

  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

const getAllMessagesInChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const messages = await Message.find({
    conversation: req.params.channelId,
    conversationType: "Channel",
  }).exec();

  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

const createMessage = async (req, res) => {
  if (!req?.body?.content)
    return res.status(400).json({ message: "Body message required" });
  if (!req?.body?.contentType)
    return res.status(400).json({ message: "Content type required" });

  if (!mongoose.Types.ObjectId.isValid(req?.body?.authorId))
    return res.status(400).json({ message: "Author ID not valid" });
  if (!mongoose.Types.ObjectId.isValid(req?.body?.conversation))
    return res.status(400).json({ message: "Conversation ID not valid" });
  if (!req?.body?.conversationType)
    return res.status(400).json({ message: "Conversation type required" });

  const author = await User.findById(req.body.authorId).select("charAvailable");
  //controlliamo che l'autore del messaggio esista
  if (!author) return res.status(400).json({ message: "Author not found" });

  //controllo che ci siano abbastanza caratteri disponibili
  if (req.body.conversationType === "Channel") {
    if (contentType === "media" || contentType === "geolocalization") {
      if (author.charAvailable < constants.MEDIA_CHAR_DIMENSION)
        return res
          .status(400)
          .json({ message: "Not enough character available" });
    } else if (contentType === "text") {
      if (author.charAvailable < req.body.content.length)
        return res
          .status(400)
          .json({ message: "Not enough character available" });
    } else
      return res.status(400).json({ message: "Content type not accepted" });
  }

  const message = {
    author: req.body.authorId,
    conversation: req.body.conversation,
    conversationType: req.body.conversationType,
    content: req.body.content,
    contentType: req.body.contentType,
  };
  try {
    const result = await Message.create(message);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const deleteMessage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Message ID not valid" });

  try {
    const result = await Message.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getAllMessagesInConversation,
  getAllMessagesInChannel,
  createMessage,
  deleteMessage,
};
