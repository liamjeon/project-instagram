const express = require("express");
const { Comment } = require("../../models/models");

class CommentRepository {
  async create(userId, username, content) {
    return Comment.create({
      userId : '1',
      content : '댓글',
      username : '유저네임',
    }).then((result) => {
      console.log(result);
    });
  }
}

module.exports = CommentRepository;
