const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const messagesController = require("../controllers/messagesController");
const postsController = require("../controllers/postsController");

// router.route("/").get(usersController.getAllUsers);

router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);
// .patch()

router
  .route("/:id/messages")
  .get(messagesController.getAllMessageByUser)
  .post(messagesController.createMessage);
// .patch()

router
  .route("/:id/posts")
  .get(postsController.getAllPostByUser)
  .post(postsController.createPost);

module.exports = router;
