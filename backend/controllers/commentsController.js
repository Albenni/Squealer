const mongoose = require("mongoose");
const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  try {
    const comments = await Comment.find({
      squealId: req.params.squealId,
    });
    res.status(200).json(comments);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

// {body: userId, content, contentType}
const addComment = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });
  if (!mongoose.Types.ObjectId.isValid(req?.body?.userId))
    return res.status(400).json({ message: "Author ID not valid" });
  if (!req?.body?.content)
    return res.status(400).json({ message: "Body message required" });

  try {
    const result = await Comment.create({
      author: req.body.userId,
      squealId: req.params.squealId,
      content: req.body.content,
    });
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

module.exports = {
  getComments,
  addComment,
};
