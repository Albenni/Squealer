const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const messagesPrivController = require("../controllers/messagesPrivController");
const postsController = require("../controllers/postsController");

// router.route("/").get(usersController.getAllUsers);

router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteUser);
// .patch()

router
  .route("/:id/messages")
  .get(messagesPrivController.getAllMessageByUser)
  .post(messagesPrivController.createMessage);
// .patch()

router
  .route("/:id/posts")
  .get(postsController.getAllPostByUser)
  .post(postsController.createPost);

module.exports = router;
