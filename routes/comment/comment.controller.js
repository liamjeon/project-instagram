const express = require("express");
const CommentRepository = require("./comment.data.js");
const commentRepository = new CommentRepository();

class CommentController {
  async createComment(req, res, next) {
    const postId = req.params.postId;
    const { content } = req.body;
    const username = "테스트아이디";
    
    console.log(req.params, content, username);

    try {
      const result = await commentRepository.create(postId, username, content);
      console.log(result);
      return res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

module.exports = CommentController;
