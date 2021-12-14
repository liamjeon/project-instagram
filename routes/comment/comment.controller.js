const express = require("express");
const CommentRepository = require("./comment.data.js");
const { Comment } = require("../../models/models");

class CommentController {
  async createComment(req, res, next) {
    const postId = req.params.postId;
    const { content } = req.body;
    const username = "테스트아이디";
    
    console.log(req.params, content, username);

    try {
      const result = await Comment.create({
        UserId : 1,
        content : '댓글',
        username : '유저네임',
      });
      console.log(result);
      return res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

module.exports = CommentController;
