const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");

router.route("/:userId").get(feedController.generateFeed); //da testare

module.exports = router;
