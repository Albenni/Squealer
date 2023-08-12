const express = require("express");
const router = express.Router();
const messagesPrivController = require("../controllers/messagesPrivController");

router
  .route("/:id")
  .delete(messagesPrivController.deleteMessage)
  .patch(messagesPrivController.editMessage);

module.exports = router;
