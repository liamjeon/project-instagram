const express = require("express");
const CommentController = require("../comment/comment.controller.js");
const commentController = new CommentController();
const isAuth = require('../../middlewares/auth.middleware.js');

const router = express.Router();

//GET /comment/:itemId
router.get("/:postId/comment",isAuth, commentController.htmlGetComments);

//POST /comment
router.post("/:postId/comment",isAuth, commentController.htmlCreateComment);

//PUT /comment/:commentId
router.put("/:postId/comment/:commentId",isAuth, commentController.htmlUpdateComment);

//DELETE /comment/:commentId
router.delete("/:postId/comment/:commentId",isAuth, commentController.htmlDeleteComment);

module.exports =  router;
