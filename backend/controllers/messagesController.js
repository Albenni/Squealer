const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Squeal");

const getAllMessagesInConversation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.convId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const messages = await Message.find({
    conversation: req.params.convId,
    conversationType: "Private",
  }).exec();

  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

module.exports = { getAllMessagesInConversation };
