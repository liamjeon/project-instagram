const CommentRepository = require('./comment.data.js')

class CommentController {
  async createComment(req, res, next) {
    const postId = req.params.postId;
    const { content } = req.body;
    const username = "테스트아이디";

    try {
      const result = await CommentRepository.create(postId, content, username);
      console.log(result);
      return res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

module.exports = CommentController;
