const Squeal = require("../models/Squeal");
const Follower = require("../models/Follower");

const generateUserFeed = async (req, res) => {
  if (req.authorized) {
    //feed per utente loggato

    const usersFollowed = await Follower.find({
      followingUserId: req.id,
      followedType: "User",
    }).select("followedId -_id");
    const groupsFollowed = await Follower.find({
      $or: [
        {
          followingUserId: req.id,
          followedType: "Channel",
        },
        {
          followingUserId: req.id,
          followedType: "Keyword",
        },
      ],
    }).select("group -_id");

    const squeals = await Squeal.find({
      $or: [
        { author: { $in: usersFollowed } },
        { group: { $in: groupsFollowed } },
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
