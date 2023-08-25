const mongoose = require("mongoose");
const User = require("../model/User");
const Moderator = require("../model/Moderator");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const getUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const user = await User.findOne({ _id: req.params.userId }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.userId} not found` });
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  //un utente può cancellare solo il proprio profilo
  if (req.id === req.params.userId) {
    try {
      const result = await User.findByIdAndRemove(req.params.userId);
      res.json(result);
    } catch (e) {
      res.status(500);
    }

    // un moderatore può cancellare tutti i profili
  } else if (req?.body?.modRequest) {
    const moderator = await Moderator.findOne({ _id: req.id }).exec();
    if (!moderator) {
      return res
        .status(403)
        .json({ message: `User ${req.id} is not Moderator` });
    } else {
      try {
        const result = await User.findByIdAndRemove(req.params.userId);
        res.json(result);
      } catch (e) {
        res.status(500);
      }
    }
  } else {
    return res
      .status(403)
      .json({ message: `User ${req.id} doesn't have permission` });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
