const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/").post(authController.userLogin);

router.route("/moderator").post(authController.modLogin);

module.exports = router;
