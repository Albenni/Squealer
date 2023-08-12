const mongoose = require("mongoose");
const MessagePriv = require("../model/MessagePriv");

const getAllMessageByUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Invalid user ID" });
  const messages = await MessagePriv.find({ author: req.params.id }).exec();
  if (!messages?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(messages);
};

const createMessage = async (req, res) => {
  const contentTypeOptions = ["text", "picture", "geolocalization"];

  if (
    !mongoose.Types.ObjectId.isValid(req?.params?.id) &&
    !mongoose.Types.ObjectId.isValid(req?.body?.receiver)
  )
    return res
      .status(400)
      .json({ message: "User ID and receiver ID not valid" });

  if (!contentTypeOptions.includes(req?.body?.contentType))
    return res.status(400).json({ message: "Content type not valid" });

  if (!req?.body?.content)
    return res.status(406).json({ message: "Body message required" });

  const message = {
    author: req.params.id,
    receiver: req.body.receiver,
    content: req.body.content,
    contentType: req.body.contentType,
  };
  try {
    const result = await MessagePriv.create(message);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const deleteMessage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Message ID not valid" });

  try {
    const result = await MessagePriv.findByIdAndDelete(req.params.id);
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
    const result = await MessagePriv.findByIdAndUpdate(
      req.params.id,
      editedMess,
      {
        new: true,
      }
    );
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getAllMessageByUser,
  createMessage,
  deleteMessage,
  editMessage,
};
