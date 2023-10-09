const express = require("express");
const router = express.Router();
const channelsController = require("../controllers/channelsController");
const squealsController = require("../controllers/squealsController");

router
  .route("/")
  .get(channelsController.searchChannels)
  .post(channelsController.createChannel); //da finire e poi da ritestare dopo modifiche

router
  .route("/:channelId")
  .get(channelsController.getChannelById)
  .delete(channelsController.deleteChannel); //da ritestare dopo modifiche

router.route("/:channelId/profilePic").get(channelsController.updateProfilePic); // da testare

router.route("/:channelId/admin").post(channelsController.addAdmin); // da testare
router
  .route("/:channelId/admin/:adminId")
  .delete(channelsController.removeAdmin); // da testare

router
  .route("/:channelId/squeals")
  .get(squealsController.getAllSquealsInChannel);

module.exports = router;
