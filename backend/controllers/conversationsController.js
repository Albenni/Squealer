const mongoose = require("mongoose");
const User = require("../models/User");
const Conversation = require("../models/Conversation");

const getAllUserConversations = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const convers = Conversation.find({
    $or: [{ user1: req.params.userId }, { user2: req.params.userId }],
  });

  return res.json(convers);
};

const createConversation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.body?.receiverId))
    return res.status(400).json({ message: "Receiver ID invalid" });

  // if (req?.id !== req.params.id) return res.status(403);

  try {
    const receiver = await User.findById(req.body.receiverId).select(
      "username"
    );
    if (!receiver)
      return res.status(400).json({ message: "Receiver ID not found" });

    const conversation = {
      user1: req.params.userId,
      user2: req.body.receiverId,
    };

    const result = await Conversation.create(conversation);

    await User.findByIdAndUpdate(req.params.userId, {
      $push: {
        conversations: result._id,
      },
    });
    await User.findByIdAndUpdate(req.body.receiverId, {
      $push: {
        conversations: result._id,
      },
    });

    return res.status(200).json({ message: "Conversation Created" });
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

module.exports = {
  getAllUserConversations,
  createConversation,
};
