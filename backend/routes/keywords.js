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

module.exports = router;
