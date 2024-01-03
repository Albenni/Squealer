const mongoose = require("mongoose");
const User = require("../models/User");
const Conversation = require("../models/Conversation");

const getAllUserConversations = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const convers = await Conversation.find({
    $or: [{ user1: req.params.userId }, { user2: req.params.userId }],
  });

  // Get the user object of the users involved in the conversation and return it in the response
  for (let i = 0; i < convers.length; i++) {
    const user1 = await User.findById(convers[i].user1);
    const user2 = await User.findById(convers[i].user2);
    convers[i].user1 = user1;
    convers[i].user2 = user2;
  }

  return res.json(convers);
};

const createConversation = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.body?.receiverId))
    return res.status(400).json({ message: "Receiver ID invalid" });

  //si possono creare conversation solo per se stessi
  if (req.id !== req.params.userId) return res.status(403);

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

    const newConversation = await Conversation.create(conversation);

    return res
      .status(200)
      .json({
        message: "Conversation created",
        conversationId: newConversation._id,
      });
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

module.exports = {
  getAllUserConversations,
  createConversation,
};
