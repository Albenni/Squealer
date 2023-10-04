const express = require("express");
const router = express.Router();
const keywordsController = require("../controllers/keywordsController");
const squealsController = require("../controllers/squealsController");

router.route("/").get(keywordsController.searchKeywords);

router
  .route("/:channelId/squeals")
  .get(squealsController.getAllSquealsInKeyword);

module.exports = router;
