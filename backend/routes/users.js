const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const messagesController = require("../controllers/messagesController");
const postsController = require("../controllers/postsController");
const conversationsController = require("../controllers/conversationsController");

router.route("/").get(usersController.getAllUsers);

router
  .route("/:userId")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);
// .patch()

router
  .route("/:userId/conversations")
  .get(conversationsController.getAllUserConversations)
  .post(conversationsController.createConversation);

router
  .route("/:userId/conversations/:convId")
  .get(messagesController.getAllMessageInConversation);
// .patch()

// router
//   .route("/:userId/channels")
//   .get(usersController.getAllUserChannels);

router
  .route("/:userId/posts")
  .get(postsController.getAllPostByUser)
  .post(postsController.createPost);

module.exports = router;
