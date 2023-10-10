const express = require("express");
const router = express.Router();
const squealsController = require("../controllers/squealsController");

router.route("/:squealId").delete(squealsController.deleteSqueal);

router
  .route("/:squealId/reactions")
  .get(squealsController.getReactions) // da testare
  .post(squealsController.addReaction); // da testare

module.exports = router;
