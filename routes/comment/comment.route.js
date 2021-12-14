const express = require("express");
const CommentController = require("../comment/comment.controller.js");
const commentController = new CommentController();
const isAuth = require('../../middlewares/auth.middleware.js');

const router = express.Router();

//GET /comment/:itemId
router.get("/:postId/comment", commentController.htmlGetComments);

//POST /comment
router.post("/:postId/comment", isAuth, commentController.htmlCreateComment);

//PUT /comment/:commentId
router.put("/:postId/comment/:commentId", commentController.htmlUpdateComment);

//DELETE /comment/:commentId
router.delete("/:postId/comment/:commentId", commentController.htmlDeleteComment);

module.exports =  router;
