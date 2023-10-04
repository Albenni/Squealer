const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const squealsController = require("../controllers/squealsController");
const conversationsController = require("../controllers/conversationsController");
const followersController = require("../controllers/followersController");
const messagesController = require("../controllers/messagesController");
const smmController = require("../controllers/smmController");

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
router
  .route("/:userId/professional")
  .patch(usersController.upgradeToProfessional); //da testare

router
  .route("/:userId/smm")
  .get(usersController.getSmmId) //da implementare
  .post(usersController.requestSmm); //da implementare
router
  .route("/:userId/vips")
  .get(smmController.getVipsManaged) //da implementare
  .post(smmController.acceptVip) //da implementare
  .delete(smmController.removeVip); //da implementare
router.route("/:userId/vips/requestsSmm").get(smmController.getRequestsForSmm); //da implementare
router
  .route("/:userId/vips/requestsSmm/:vipId")
  .delete(smmController.deleteRequest); //da implementare

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
  .get(squealsController.getAllSquealsByUser)
  .post(squealsController.createSqueal);

module.exports = router;
