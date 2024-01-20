const express = require("express");
const router = express.Router();
const keywordsController = require("../controllers/keywordsController");
const squealsController = require("../controllers/squealsController");

router
  .route("/")
  .get(keywordsController.searchKeywords)
  .post(keywordsController.createKeyword);

router
  .route("/:keywordId/squeals")
  .get(squealsController.getAllSquealsInKeyword);

router.route("/:keywordId/followers").get(keywordsController.getFollowers);

module.exports = router;
