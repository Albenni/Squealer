const mongoose = require("mongoose");
const User = require("../models/User");
const Moderator = require("../models/Moderator");

const searchUser = async (req, res) => {
  try {
    const findUser = req.query.username ? req.query.username : "";
    const users = await User.find({
      username: { $regex: ".*" + findUser + ".*" },
    });
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
};

const getCharsAvailable = async (req, res) => {
  // da fare
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  if (req.id !== req.params.id) {
  } else {
    const moderator = await Moderator.findOne({ _id: req.id }).exec();
    if (!moderator) return res.status(403);
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(204)
        .json({ message: `User ID ${req.params.userId} not found` });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

const getUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `User ID ${req.params.userId} not found` });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  //un utente vuole cancellare il proprio profilo
  if (req.id === req.params.userId) {
    try {
      const result = await User.findByIdAndRemove(req.params.userId);
      res.json(result);
    } catch (e) {
      res.status(500);
    }

    // un moderatore può cancellare tutti i profili
  } else {
    const moderator = await Moderator.findOne({ _id: req.id }).exec();
    if (!moderator) return res.status(403);

    try {
      const result = await User.findByIdAndRemove(req.params.userId);
      res.json(result);
    } catch (e) {
      res.status(500);
    }
  }
};

module.exports = {
  searchUser,
  getCharsAvailable,
  deleteUser,
  getUser,
};
