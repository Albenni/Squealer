const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.route("/").post(postsController.createPost);

router
  .route("/:id")
  .delete(postsController.deletePost)
  .patch(postsController.editPost);

module.exports = router;
