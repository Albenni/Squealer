const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.route("/:postId").delete(postsController.deletePost);

router
  .route("/:postId/reactions")
  .get(postsController.getPostReactions)
  .post(postsController.addPostReactions);

module.exports = router;
