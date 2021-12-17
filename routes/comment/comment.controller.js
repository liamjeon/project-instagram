const CommentRepository = require("./comment.data.js");
const commentRepository = new CommentRepository();

class CommentController {
  async htmlCreateComment(req, res, next) {
    const { content } = req.body;
    const { postId } = req.params;
    const username = req.user.username;
    const userId = req.user.id;
    const profileUrl = req.user.profileUrl;

    try {
      const result = await commentRepository.create(
        userId,
        postId,
        username,
        content,
        profileUrl
      );
      console.log(result);
      return res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async htmlGetComments(req, res, next) {
    const postId = req.params.postId;

    try {
      const result = await commentRepository.getByPostId(postId);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async htmlUpdateComment(req, res, next) {
    const commentId = req.params.commentId;
    const content = req.body.content;

    try {
      const result = await commentRepository.updateByCommentId(
        commentId,
        content
      );
      console.log(result);
      return res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async htmlDeleteComment(req, res, next) {
    const commentId = req.params.commentId;

    try {
      const result = await commentRepository.removeByCommentId(commentId);
      console.log(result);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

module.exports = CommentController;
