const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

router.route("/").post(messagesController.createMessage);

router.route("/:id").delete(messagesController.deleteMessage);

module.exports = router;
