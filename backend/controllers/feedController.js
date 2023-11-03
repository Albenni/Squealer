const Squeal = require("../models/Squeal");
const Follower = require("../models/Follower");

const generateFeed = async (req, res) => {
  if (req.authorized) {
    //feed per utente loggato
    console.log("feed per utente loggato");

    const usersFollowed = await Follower.find({
      followingUserId: req.id,
      followedType: "User",
    }).select("followedId -_id");
    const usersFollowedFilter = usersFollowed.map((item) => item.followedId);
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
    }).select("followedId -_id");
    const groupsFollowedFilter = groupsFollowed.map((item) => item.followedId);

    const squeals = await Squeal.find({
      $or: [
        { author: { $in: usersFollowedFilter } },
        { group: { $in: groupsFollowedFilter } },
      ],
    }).populate("group", "name private editorialChannel profilePic");

    res.status(200).json(squeals);
  } else {
    console.log("feed per guest");
    //feed per utente non loggato
    const squeals = await Squeal.find({
      officialChannel: true,
      squealType: "Channel",
    }).populate("group", "name private editorialChannel profilePic");
    if (!squeals?.length)
      return res.status(204).json({ message: "No content" });

    return res.status(200).json(squeals);
  }
};

module.exports = {
  generateFeed,
};
