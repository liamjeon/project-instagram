const express = require("express");
const { Comment } = require("../../models/models");

class CommentRepository {
  async create(userId, postId, username, content, profileUrl) {
    return Comment.create({
      userId,
      postId,
      content,
      username,
      profileUrl,
    });
  }

  async getByPostId(postId) {
    return Comment.findAll({ where: { postId } });
  }

  async updateByCommentId(commentId, content) {
    return Comment.findByPk(commentId).then((comment) => {
      console.log(comment);
      comment.content = content;
      return comment.save();
    });
  }
  async removeByCommentId(commentId) {
    return Comment.destroy({ where: { id: commentId } });
  }
}

module.exports = CommentRepository;
