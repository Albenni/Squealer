const mongoose = require("mongoose");
const Squeal = require("../models/Squeal");
const Keyword = require("../models/Keyword");

const searchKeywords = async (req, res) => {
  try {
    const findKeywords = req.query.keyword ? req.query.keyword : "";
    const keywords = await Keyword.find({
      name: { $regex: ".*" + findKeywords + ".*" },
    }).select("-__v");
    if (!keywords) return res.status(204).json({ message: "No keyword found" });
    res.json(keywords);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { searchKeywords };
