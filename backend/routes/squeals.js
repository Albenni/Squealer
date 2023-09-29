const express = require("express");
const router = express.Router();
const squealsController = require("../controllers/squealsController");

router.route("/:squealId").delete(squealsController.deleteSqueal); // da testare

router.route("/:squealId/reactions").post(squealsController.addSquealReactions);

module.exports = router;
