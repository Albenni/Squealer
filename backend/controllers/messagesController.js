const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const getAllMessagesInConversation = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.convId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  const convers = await Conversation.findById(req.params.convId);
  if (!convers)
    return res.status(204).json({ message: "Conversation not found" });
  if (
    !(
      convers.user1.equals(req.params.userId) ||
      convers.user2.equals(req.params.userId)
    )
  )
    return res.status(403).json({ message: "Not your conversation" });

  const messages = await Message.find({
    conversation: req.params.convId,
  })
    .select("author conversation content contentType createdAt")
    .exec();

  if (!messages?.length)
    return res.status(204).json({ message: "No messages found" });

  res.json(messages);
};

const createMessage = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.convId))
    return res.status(400).json({ message: "Invalid conversation ID" });

  if (!req?.body?.content && !req.files)
    return res.status(400).json({ message: "Body message required" });
  if (!req?.body?.contentType)
    return res.status(400).json({ message: "Content type required" });

  if (
    req.files?.message &&
    (req.body.contentType === "image" || req.body.contentType === "video")
  ) {
    try {
      const extension =
        "." +
        req.files.message?.name.slice(
          ((req.files.message?.name.lastIndexOf(".") - 1) >>> 0) + 2
        );
      const message = {
        author: req.params.userId,
        conversation: req.params.convId,
        content: extension,
        contentType: req.body.contentType,
      };

      const result = await Message.create(message);
      req.files.message.mv("./public/messagesMedia/" + result._id + extension);
      return res.status(200).json({ message: "message created" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } else {
    const message = {
      author: req.params.userId,
      conversation: req.params.convId,
      content: req.body.content,
      contentType: req.body.contentType,
    };

    try {
      await Message.create(message);
      return res.status(200).json({ message: "message created" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};

module.exports = { getAllMessagesInConversation, createMessage };
