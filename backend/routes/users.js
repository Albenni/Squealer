const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const messagesController = require("../controllers/messagesController");
const postsController = require("../controllers/postsController");
const conversationsController = require("../controllers/conversationsController");
const channelsController = require("../controllers/channelsController");

router.route("/").get(usersController.searchUser);

router
  .route("/:userId")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);

router.route("/:userId/charAvailable").get(usersController.getCharsAvailable);

router.route("/:userId/channels").post(channelsController.followChannel);

router
  .route("/:userId/conversations")
  .get(conversationsController.getAllUserConversations)
  .post(conversationsController.createConversation);

router
  .route("/:userId/conversations/:convId")
  .get(messagesController.getAllMessagesInConversation);

router
  .route("/:userId/posts")
  .get(postsController.getAllPostByUser)
  .post(postsController.createPost);

module.exports = router;
