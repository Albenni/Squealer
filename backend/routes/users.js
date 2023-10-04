const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const squealsController = require("../controllers/squealsController");
const conversationsController = require("../controllers/conversationsController");
const followersController = require("../controllers/followersController");
const messagesController = require("../controllers/messagesController");

router.route("/").get(usersController.searchUser);

router
  .route("/:userId")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);

router.route("/:userId/charAvailable").get(usersController.getCharsAvailable);
router.route("/:userId/username").patch(usersController.updateUsername); //da implementare
router.route("/:userId/password").patch(usersController.updatePassword); //da implementare
router.route("/:userId/email").patch(usersController.updateEmail); //da implementare
router.route("/:userId/profilePicture").patch(usersController.updateProfilePic); //da implementare

// router.route("/:userId/smm").patch(usersController.funzione); //da implementare

router
  .route("/:userId/channels")
  .get(usersController.getUserSubscribedChannels)
  .post(followersController.followChannel);

router
  .route("/:userId/channels/:channelId")
  .delete(followersController.unfollowChannel);

router
  .route("/:userId/conversations")
  .get(conversationsController.getAllUserConversations)
  .post(conversationsController.createConversation);

router
  .route("/:userId/conversations/:convId")
  .get(messagesController.getAllMessagesInConversation)
  .post(messagesController.createMessage);

router
  .route("/:userId/squeals")
  .get(squealsController.getAllUserSqueals)
  .post(squealsController.createSqueal);

module.exports = router;
