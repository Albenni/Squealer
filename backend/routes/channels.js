const express = require("express");
const router = express.Router();
const channelsController = require("../controllers/channelsController");
const squealsController = require("../controllers/squealsController");

router
  .route("/")
  .get(channelsController.searchChannels)
  .post(channelsController.createChannel);

router
  .route("/:channelId")
  .get(channelsController.getChannelById)
  .delete(channelsController.deleteChannel);
// .patch()

router
  .route("/:channelId/squeals")
  .get(squealsController.getAllSquealsInChannel);

module.exports = router;
