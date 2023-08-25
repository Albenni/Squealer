const mongoose = require("mongoose");
const Message = require("../model/Message");

const getAllMessageInConversation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.conversationId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const messages = await Message.find({
    receiver: req.params.channelId,
  }).exec();

  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

const getAllMessageInChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.conversationId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const messages = await Message.find({
    receiver: req.params.channelId,
  }).exec();

  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

const createMessage = async (req, res) => {
  const contentTypeOptions = ["text", "picture", "geolocalization"];

  if (!mongoose.Types.ObjectId.isValid(req?.body?.receiver))
    return res
      .status(400)
      .json({ message: "User ID and receiver ID not valid" });

  if (!contentTypeOptions.includes(req?.body?.contentType))
    return res.status(400).json({ message: "Content type not valid" });

  if (!req?.body?.receiverType)
    return res.status(400).json({ message: "Receiver type not valid" });

  if (!req?.body?.content)
    return res.status(406).json({ message: "Body message required" });

  const message = {
    author: req.id,
    receiver: req.body.receiver,
    receiverType: req.body.receiverType,
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
  getAllMessageInConversation,
  createMessage,
  deleteMessage,
  editMessage,
};
