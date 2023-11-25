const Squeal = require("../models/Squeal");
const Follower = require("../models/Follower");

const generateFeed = async (req, res) => {
  const squealLengthBlock = 10; //numero di squeal ritornati ad ogni richiesta
  let index = 0;
  if (!isNaN(req?.query?.index)) {
    index = parseInt(req.query.index);
  }
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
    try {
      const squeals = await Squeal.find({
        $or: [
          { author: { $in: usersFollowedFilter } },
          { "receivers.group": { $in: groupsFollowedFilter } },
        ],
      })
        .sort("-createdAt")
        .skip(squealLengthBlock * index)
        .limit(squealLengthBlock * (index + 1))
        .populate(
          "receivers.group",
          "name private editorialChannel profilePic"
        );

      squeals.map((squeal) => {
        squeal.impression += 1;
        squeal.save();
      });

      if (!squeals?.length)
        return res.status(204).json({ message: "No content" });

      res.status(200).json(squeals);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    console.log("feed per guest");
    //feed per utente non loggato
    const squeals = await Squeal.find({
      officialChannel: true,
    })
      .skip(squealLengthBlock * index)
      .limit(squealLengthBlock * (index + 1))
      .populate("receivers.group", "name private editorialChannel profilePic");
    if (!squeals?.length)
      return res.status(204).json({ message: "No content" });

    return res.status(200).json(squeals);
  }
};

module.exports = {
  generateFeed,
};
