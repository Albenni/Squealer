const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.route("/").post(postsController.createPost);

router.route("/:id").delete(postsController.deletePost);

module.exports = router;
