const express = require("express");
const router = express.Router();
const squealsController = require("../controllers/squealsController");
const commentsController = require("../controllers/commentsController");

router.route("/").get(squealsController.searchSqueal);

router.route("/:squealId").delete(squealsController.deleteSqueal);

router
  .route("/:squealId/receivers/:receiverId")
  .post(squealsController.addReceiver) //da testare
  .delete(squealsController.removeReceiver); //da testare

router
  .route("/:squealId/reactions")
  .get(squealsController.getReactions) // da testare
  .post(squealsController.addReaction)
  .delete(squealsController.removeReaction); // da testare

router
  .route("/:squealId/comments")
  .get(commentsController.getComments) // da testare
  .post(commentsController.addComment); // da testare

// router
//   .route("/:squealId/comments/:commentId")
//   .delete(commentsController.deleteComment);

module.exports = router;
