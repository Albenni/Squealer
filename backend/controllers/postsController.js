const mongoose = require("mongoose");
const Post = require("../model/Post");

const getAllPostByUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Invalid user ID" });
  const post = await Post.find({ author: req.params.id }).exec();

  if (!post?.length) {
    return res.status(204).json({ message: `No messages found` });
  }

  res.json(post);
};

const createPost = async (req, res) => {
  const contentTypeOptions = ["text", "picture", "geolocalization"];

  if (!contentTypeOptions.includes(req?.body?.contentType))
    return res.status(400).json({ message: "Content type not valid" });

  const post = {
    author: req.id,
    content: req.body.content,
    contentType: req.body.contentType,
  };
  try {
    const result = await Post.create(post);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const deletePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Message ID not valid" });

  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

const editPost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.id))
    return res.status(400).json({ message: "Post ID not valid" });

  if (!req?.body?.content && !req?.body?.contentType)
    return res.status(406).json({ message: "Body message e type required" });

  const editedPost = {
    content: req.body.content,
    contentType: req.body.contentType,
    lastEdited: Date.now(),
  };

  try {
    const result = await Post.findByIdAndUpdate(req.params.id, editedPost, {
      new: true,
    });
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getAllPostByUser,
  createPost,
  deletePost,
  editPost,
};
