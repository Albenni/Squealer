const mongoose = require("mongoose");
const Message = require("../models/Squeal");
const Conversation = require("../models/Conversation");

const getAllMessagesInConversation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.convId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const convers = await Conversation.findById(req.params.convId);
  if (!convers)
    return res.status(204).json({ message: "Conversation not found" });
  if (
    !(
      convers.user1 === req.params.userId || convers.user2 === req.params.userId
    )
  )
    return res.status(403).json({ message: "Not your conversation" });

  const messages = await Message.find({
    conversation: req.params.convId,
  }).exec();

  if (!messages?.length)
    return res.status(204).json({ message: "No messages found" });

  res.json(messages);
};

module.exports = { getAllMessagesInConversation };
