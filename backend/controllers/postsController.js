const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const constants = require("../constants");

const getAllPostByUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "Invalid user ID" });
  const post = await Post.find({ author: req.params.userId }).exec();

  if (!post?.length) {
    return res.status(204).json({ message: `No messages found` });
  }
  res.json(post);
};

const createPost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "Invalid user ID" });
  if (!req?.body?.content)
    return res.status(400).json({ message: "Body message required" });

  const contentTypeOptions = ["text", "media", "geolocalization"];
  if (!contentTypeOptions.includes(req?.body?.contentType))
    return res.status(400).json({ message: "Content type not valid" });

  //controlliamo che l'autore del messaggio esista
  const author = await User.findById(req.params.userId).select("charAvailable");
  if (!author) return res.status(400).json({ message: "Author not found" });

  const postLength =
    contentType === "text"
      ? req.body.content.length
      : constants.MEDIA_CHAR_DIMENSION;

  if (author.charAvailable < postLength)
    return res.status(400).json({ message: "Not enough character available" });

  const post = {
    author: req.params.userId,
    content: req.body.content,
    contentType: req.body.contentType,
  };
  try {
    const result = await Post.create(post);

    //togliamo i caratteri all'utente che ha creato il post
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
        charAvailable: author.charAvailable - postLength,
      },
      { runValidators: true }
    );
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const deletePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.postId))
    return res.status(400).json({ message: "Post ID not valid" });

  try {
    const result = await Post.findByIdAndDelete(req.params.postId);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const getPostReactions = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.postId))
    return res.status(400).json({ message: "Post ID not valid" });

  const reactions = await Post.findById(req.params.postId).select(
    "positiveReaction negativeReaction"
  );

  if (!reactions) return res.status(204).json({ message: `Post not found` });

  res.status(200).json(reactions);
};

// da implementare
const addPostReactions = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.postId))
    return res.status(400).json({ message: "Post ID not valid" });

  // const result = await Post.findById(req.params.postId).select(
  //   "positiveReaction negativeReaction"
  // );

  // if (!reactions) return res.status(204).json({ message: `No messages found` });

  // res.status(200).json(reactions);
};

module.exports = {
  getAllPostByUser,
  createPost,
  deletePost,
  getPostReactions,
  addPostReactions,
};
