const express = require("express");
const CommentController = require("../comment/comment.controller.js");
const commentController = new CommentController();
// import isAuth from "../middleware/auth.js";

const router = express.Router();

//GET /comment/:itemId
router.get("/:postId/comment", commentController.htmlGetComments);

//POST /comment
router.post("/:postId/comment", commentController.htmlCreateComment);

//PUT /comment/:commentId
router.put("/:postId/comment/:commentId", commentController.htmlUpdateComment);

//DELETE /comment/:commentId
router.delete("/:postId/comment/:commentId", commentController.htmlDeleteComment);

module.exports =  router;
