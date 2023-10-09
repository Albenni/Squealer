const express = require("express");
const router = express.Router();
const newpasswordController = require("../controllers/newpasswordController");

router
  .route("/")
  .post(newpasswordController.sendResetOTP)
  .patch(newpasswordController.resetPassword);

module.exports = router;
