const express = require("express");
const router = express.Router();
const channelsController = require("../controllers/channelsController");
const messagesController = require("../controllers/messagesController");

router
  .route("/")
  .get(channelsController.searchChannels)
  .post(channelsController.createChannel);

router
  .route("/:id")
  .get(channelsController.getChannelById)
  .delete(channelsController.deleteChannel);
// .patch()

router.route("/:id/messages").get(messagesController.getAllMessagesInChannel);

module.exports = router;
