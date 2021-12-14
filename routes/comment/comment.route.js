const express = require("express");
const CommentController = require("../comment/comment.controller.js");
const commentController = new CommentController();
// import isAuth from "../middleware/auth.js";

const router = express.Router();

//GET /comment/:itemId
// router.get("/:postId/comment", commentController.getComment);

//POST /comment
router.post("/:postId/comment", commentController.createComment);

//PUT /comment/:commentId
// router.put("/:postId/comment/:commentId", commentController.updateComment);

//DELETE /comment/:commentId
// router.delete("/:postId/comment/:commentId", commentController.deleteComment);

module.exports =  router;
