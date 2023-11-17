const mongoose = require("mongoose");
const Keyword = require("../models/Keyword");

const searchKeywords = async (req, res) => {
  try {
    const findKeywords = req.query.keyword ? req.query.keyword : "";
    const keywords = await Keyword.find({
      name: { $regex: ".*" + findKeywords + ".*" },
    }).select("-__v");

    // if (!keywords)
    //   return res.status(204).json({ message: "No keyword found" });

    res.status(200).json(keywords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

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

module.exports = { searchKeywords, createKeyword };
