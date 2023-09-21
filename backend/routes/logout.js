const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

router.route("/").get(logoutController.userLogout);

router.route("/moderator").get(logoutController.modLogout);

module.exports = router;
