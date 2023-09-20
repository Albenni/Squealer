const mongoose = require("mongoose");
const Message = require("../model/Message");

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

  if (!mongoose.Types.ObjectId.isValid(req?.body?.conversation))
    return res.status(400).json({ message: "Conversation ID not valid" });
  if (!req?.body?.conversationType)
    return res.status(400).json({ message: "Conversation type required" });

  const message = {
    author: req.id,
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

const editMessage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Message ID not valid" });

  if (!req?.body?.content && !req?.body?.contentType)
    return res.status(406).json({ message: "Body message e type required" });

  const editedMess = {
    content: req.body.content,
    contentType: req.body.contentType,
    lastEdited: Date.now(),
  };

  try {
    const result = await Message.findByIdAndUpdate(req.params.id, editedMess, {
      new: true,
    });
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
  editMessage,
};
