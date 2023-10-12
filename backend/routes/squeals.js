const express = require("express");
const router = express.Router();
const squealsController = require("../controllers/squealsController");
const commentsController = require("../controllers/commentsController");

router.route("/:squealId").delete(squealsController.deleteSqueal);

router
  .route("/:squealId/reactions")
  .get(squealsController.getReactions) // da testare
  .post(squealsController.addReaction); // da testare

router
  .route("/:squealId/comments")
  .get(commentsController.getComments) // da implementare
  .post(commentsController.addComment); // da implementare

// router
//   .route("/:squealId/comments/:commentId")
//   .delete(commentsController.deleteComment);

module.exports = router;
