const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");
const messagesController = require("../controllers/messagesController");

router.route("/").get(channelController.getAllChannels);

router
  .route("/:id")
  .get(channelController.getChannelById)
  .delete(channelController.deleteChannel);
// .patch()

router.route("/:id/messages").get(messagesController.getAllMessagesInChannel);

module.exports = router;
