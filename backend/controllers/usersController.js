const mongoose = require("mongoose");
const User = require("../models/User");
const Moderator = require("../models/Moderator");
const Follower = require("../models/Follower");

const searchUser = async (req, res) => {
  try {
    if (req?.query?.exactMatch) {
      const user = await User.findOne({
        username: req?.query?.username,
      }).select("username profilePic");
      if (!user) return res.status(204).json({ message: "No users found" });
      res.json(user);
    } else {
      const findUser = req.query.username ? req.query.username : "";
      const users = await User.find({
        username: { $regex: ".*" + findUser + ".*" },
      }).select("username profilePic");
      if (!users) return res.status(204).json({ message: "No users found" });
      res.json(users);
    }
  } catch (error) {
    res.json({ message: error });
  }
};

const getCharsAvailable = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  if (req.id !== req.params.id) {
  } else {
    const moderator = await Moderator.findById(req.id).exec();
    if (!moderator) return res.status(403);
  }

  try {
    const user = await User.findById(req.params.userId).select("charAvailable");
    if (!user) {
      console.log("CIAO");
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

//da implementare
const updateUsername = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    //modifica username
  } catch (error) {
    res.json({ message: error });
  }
};

//da implementare
const updatePassword = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    //modifica password
  } catch (error) {
    res.json({ message: error });
  }
};

//da implementare
const updateEmail = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    //modifica email
  } catch (error) {
    res.json({ message: error });
  }
};

//da implementare
const updateProfilePic = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    //modifica immagine del profilo
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  if (!req.authorized) return res.status(403);

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
    //sembra non funzionare, da testare
    const moderator = await Moderator.findById(req.id).exec();
    if (!moderator) return res.status(403);
    console.log("CIOA");

    try {
      const result = await User.findByIdAndRemove(req.params.userId);
      res.json(result);
    } catch (e) {
      res.status(500);
    }
  }
};

const getUserSubscribedChannels = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    const channels = await Follower.find({
      followingUserId: req.params.userId,
      followedType: "Channel",
    }).select("group -_id");
    if (!channels)
      return res.status(204).json({ message: "No channels found" });

    res.json(channels);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  searchUser,
  getCharsAvailable,
  deleteUser,
  getUser,
  updateUsername,
  updatePassword,
  updateEmail,
  updateProfilePic,
  getUserSubscribedChannels,
};
