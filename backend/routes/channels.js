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
  .delete(channelsController.deleteChannel); //da testare

router.route("/:channelId/profilePic").get(channelsController.updateProfilePic); // da testare
router.route("/:channelId/blocked").get(channelsController.blockSblock); // da testare

router.route("/:channelId/admins").post(channelsController.addAdmin);
router
  .route("/:channelId/admins/:adminId")
  .delete(channelsController.removeAdmin);

router
  .route("/:channelId/squeals")
  .get(squealsController.getAllSquealsInChannel);

module.exports = router;
