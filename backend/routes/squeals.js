const express = require("express");
const router = express.Router();
const squealsController = require("../controllers/squealsController");
const commentsController = require("../controllers/commentsController");

router
  .route("/")
  .get(squealsController.searchSqueal)
  .post(squealsController.createEditorialSqueal);

router.route("/:squealId").delete(squealsController.deleteSqueal);

router
  .route("/:squealId/receivers/:receiverId")
  .post(squealsController.addReceiver)
  .delete(squealsController.removeReceiver);

router
  .route("/:squealId/reactions")
  .get(squealsController.getReactions)
  .post(squealsController.addReaction)
  .delete(squealsController.removeReaction);

router
  .route("/:squealId/comments")
  .get(commentsController.getComments)
  .post(commentsController.addComment);

module.exports = router;
