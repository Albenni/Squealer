const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

router.route("/").get(refreshTokenController.userRefreshToken);

router.route("/moderator").post(authController.modRefresh);

module.exports = router;
