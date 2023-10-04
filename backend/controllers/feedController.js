const jwt = require("jsonwebtoken");
const Squeal = require("../models/Squeal");
const ChannelSubscription = require("../models/ChannelSubscription");
const Follower = require("../models/Follower");

const generateUserFeed = async (req, res) => {
  if (req.authorized) {
    //feed per utente loggato

    const usersFollowed = await Follower.find({
      followingUserId: req.id,
      followedType: "User",
    }).select("followedId -_id");
    const channelsFollowed = await ChannelSubscription.find({
      userId: req.id,
    }).select("channel -_id");

    const squeals = await Squeal.find({
      $or: [
        { author: { $in: usersFollowed } },
        { channel: { $in: channelsFollowed } },
      ],
    });

    res.status(200).json(squeals);
  } else {
    //feed per utente non loggato
    const squeals = await Squeal.find({
      officialChannel: true,
      squealType: "Channel",
    });
    if (!squeals) return res.status(204);

    res.status(200).json(squeals);
  }
};

module.exports = {
  generateUserFeed,
};
