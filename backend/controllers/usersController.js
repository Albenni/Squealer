const mongoose = require("mongoose");
const User = require("../models/User");
const Moderator = require("../models/Moderator");
const Follower = require("../models/Follower");
const Smm = require("../models/Smm");
const Channel = require("../models/Channel");

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

  //verifica che l'utente abbia il permesso
  if (req.id !== req.params.userId) {
    if (req.isMod) {
      const moderator = await Moderator.findById(req.id).exec();
      if (!moderator) return res.status(403);
    } else if (req.isSmm) {
      const smm = await Smm.findOne({
        vipId: req.params.userId,
        smmId: req.id,
      });
      if (!smm)
        return res
          .status(403)
          .json({ message: "You are not the SMM for this Vip" });
    } else {
      return res.status(403);
    }
  }

  try {
    const user = await User.findById(req.params.userId).select("charAvailable");
    if (!user) {
      return res.status(204).json({ message: "User ID not found" });
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

// Body: {oldusername: string, newusername: string}
const updateUsername = async (req, res) => {
  const { newusername } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    // Controllo che lo username non sia gia in uso
    const duplicate = await User.findOne({ username: newusername }).exec();
    if (duplicate) return res.sendStatus(409);

    // Aggiorno e ritorno lo user aggiornato
    const result = await User.findByIdAndUpdate(
      req.params.userId,
      { username: newusername },
      { new: true }
    ).exec();

    if (!result)
      return res
        .status(404)
        .json({ message: `User ID ${req.params.userId} not found` });

    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

// Body: {oldpassword: string, newpassword: string}
const updatePassword = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const { oldpassword, newpassword } = req.body;

  if (!oldpassword || !newpassword)
    return res.status(400).json({ message: "Missing password" });

  if (oldpassword === newpassword)
    return res
      .status(400)
      .json({ message: "New password must be different from the old one" });

  try {
    const user = await User.findById(req?.params?.userId);

    // Controllo che la vecchia password sia corretta
    if (user.password !== oldpassword) {
      return res.status(400).json({ message: "Old password is wrong" });
    }

    // Aggiorno la password con save (update dice che è deprecato)
    user.password = newpassword;
    await user.save();

    // Ritorno lo user aggiornato
    return res.json({ message: "Password aggiornata con successo", user });
  } catch (error) {
    return res.status(500).json({
      message:
        "Si è verificato un errore durante l'aggiornamento della password",
      error,
    });
  }
};

// Body {newemail: string}
const updateEmail = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const { newemail } = req.body;

  if (!newemail) return res.status(400).json({ message: "Missing email" });

  try {
    // Aggiorno e ritorno lo user aggiornato
    const result = await User.findByIdAndUpdate(
      req.params.userId,
      { email: newemail },
      { new: true }
    ).exec();

    if (!result)
      return res
        .status(404)
        .json({ message: `User ID ${req.params.userId} not found` });

    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

// Body {newprofilepicture: string}
const updateProfilePic = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const { newprofilepicture } = req.body;

  if (!newprofilepicture)
    return res.status(400).json({ message: "Missing profile picture" });

  // Controllo che l'immagine sia valida (il MIME type deve essere image)
  let isValid = false;
  await fetch(newprofilepicture).then((res) => {
    const contentType = res.headers.get("content-type");
    isValid = contentType?.startsWith("image");
  });

  if (!isValid) return res.status(400).json({ message: "Invalid image" });

  console.log(newprofilepicture);

  try {
    // Aggiorno e ritorno lo user aggiornato
    const result = await User.findByIdAndUpdate(
      req.params.userId,
      { profilePic: newprofilepicture },
      { new: true }
    ).exec();

    console.log(result);

    if (!result)
      return res
        .status(404)
        .json({ message: `User ID ${req.params.userId} not found` });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

const upgradeToProfessional = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  if (req.id !== req.params.userId) return res.status(403);

  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.id },
      { professional: true },
      { new: true }
    );
    res.json(result);
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
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  try {
    const channels = await Follower.find({
      followingUserId: req.params.userId,
      followedType: "Channel",
    }).select("followedId -_id");
    if (!channels)
      return res.status(204).json({ message: "No channels found" });

    const channelsId = channels.map((channel) => channel.followedId);
    const channelsComplete = await Channel.find({ _id: { $in: channelsId } });

    res.json(channelsComplete);
  } catch (error) {
    res.json({ message: error });
  }
};

const getSmmId = async (req, res) => {};
const requestSmm = async (req, res) => {};

module.exports = {
  searchUser,
  getCharsAvailable,
  deleteUser,
  getUser,
  updateUsername,
  updatePassword,
  updateEmail,
  updateProfilePic,
  upgradeToProfessional,
  getUserSubscribedChannels,
  getSmmId,
  requestSmm,
};
