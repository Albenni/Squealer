const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const squealsController = require("../controllers/squealsController");
const conversationsController = require("../controllers/conversationsController");
const channelSubscriptionController = require("../controllers/channelSubscriptionController");
const messagesController = require("../controllers/messagesController");

router.route("/").get(usersController.searchUser);

router
  .route("/:userId")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);

router.route("/:userId/charAvailable").get(usersController.getCharsAvailable);

router
  .route("/:userId/channels")
  .get(usersController.getUserSubscribedChannels); //da testare

router
  .route("/:userId/channels/:channelId")
  .post(channelSubscriptionController.followChannel)
  .delete(channelSubscriptionController.unfollowChannel);

router
  .route("/:userId/conversations")
  .get(conversationsController.getAllUserConversations)
  .post(conversationsController.createConversation);

router
  .route("/:userId/conversations/:convId")
  .get(messagesController.getAllMessagesInConversation);

router
  .route("/:userId/squeals")
  .get(squealsController.getAllUserSqueals)
  .post(squealsController.createSqueal);

module.exports = router;
