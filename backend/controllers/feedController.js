const jwt = require("jsonwebtoken");
const Squeal = require("../models/Squeal");
const ChannelSubscription = require("../models/ChannelSubscription");
const Follower = require("../models/Follower");

const generateUserFeed = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader?.startsWith("Bearer ")) {
    //feed per utente loggato
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token

      const usersFollowed = await Follower.find({
        followingUserId: decoded.UserInfo.id,
      }).select("followedUserId -_id");
      const channelsFollowed = await ChannelSubscription.find({
        userId: decoded.UserInfo.id,
      }).select("channel -_id");

      const squeals = await Squeal.find({
        $or: [
          { author: { $in: usersFollowed } },
          { channel: { $in: channelsFollowed } },
        ],
      });

      res.status(200).json(squeals);
    });
  } else {
    //feed per utente non loggato
    const squeals = await Squeal.find({
      officialChannel: true,
      channelSqueal: true,
    });
    if (!squeals) return res.status(204);

    res.status(200).json(squeals);
  }
};

module.exports = {
  generateUserFeed,
};
