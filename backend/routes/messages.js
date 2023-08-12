const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

router
  .route("/:id")
  .delete(messagesController.deleteMessage)
  .patch(messagesController.editMessage);

module.exports = router;
