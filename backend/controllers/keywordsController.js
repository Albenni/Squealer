const mongoose = require("mongoose");
const Keyword = require("../models/Keyword");

const searchKeywords = async (req, res) => {
  try {
    const findKeywords = req.query.keyword ? req.query.keyword : "";

    if (req.query.exactMatch) {
      if (!findKeywords)
        return res
          .status(400)
          .json({ message: "Keyword required for exact match" });

      const keyword = await Keyword.findOne({ name: findKeywords });
      if (!keyword)
        return res.status(204).json({ message: "No keyword found" });

      res.json(keyword);
    } else {
      const keywords = await Keyword.find({
        name: { $regex: ".*" + findKeywords + ".*" },
      }).select("-__v");

      if (!keywords?.length)
        return res.status(204).json({ message: "No keyword found" });

      res.status(200).json(keywords);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

// const searchKeywords = async (req, res) => {
//   try {
//     const findKeywords = req.query.keyword ? req.query.keyword : "";
//     if (req.query.exactMatch) {
//       if (!findKeywords)
//         return res.status(400).json({ message: "Keyword required for exact match" });

//       const keyword = await Keyword.findOne({ name: findKeywords });
//       if (!keyword)
//         return res.status(204).json({ message: "No keyword found" });

//       res.json(keyword);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error });
//   }
// };

const createKeyword = async (req, res) => {
  if (!req.authorized) return res.sendStatus(403);

  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "keyword name required" });

  try {
    const result = await Keyword.create({
      name: name,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const getFollowers = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.keywordId))
    return res.status(400).json({ message: "Channel ID invalid" });

  try {
    const users = await Follower.find({
      followedId: req.params.keywordId,
      followedType: "Keyword",
    }).select("followingUserId -_id");

    const usersId = users.map((user) => user.followingUserId);
    const usersComplete = await User.find({ _id: { $in: usersId } });

    if (!usersComplete?.length)
      return res.status(204).json({ message: "No users found" });

    res.json(usersComplete);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { searchKeywords, createKeyword, getFollowers };
