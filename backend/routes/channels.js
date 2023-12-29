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

router.route("/:channelId/followers").get(channelsController.getFollowers);

router.route("/:channelId/name").patch(channelsController.changeName);
router
  .route("/:channelId/description")
  .patch(channelsController.changeDescription);
router
  .route("/:channelId/profilePic")
  .patch(channelsController.updateProfilePic);
router.route("/:channelId/blocked").patch(channelsController.blockSblock); // da testare

router.route("/:channelId/admins").post(channelsController.addAdmin);
router
  .route("/:channelId/admins/:adminId")
  .delete(channelsController.removeAdmin);

router
  .route("/:channelId/squeals")
  .get(squealsController.getAllSquealsInChannel);

module.exports = router;
