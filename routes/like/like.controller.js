const { sequelize, Like, Post } = require("../../models/models");

// Main Page
async function httpToggleLikeMain(req, res) {
  console.log(req.body);
  const { postId, liked } = req.body;
  const { id: userId } = req.user;
  try {
    const exisitingPost = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!exisitingPost) return res.status(400).send();

    const existstingLike = await Like.findOne({
      where: {
        liked,
        postId,
        userId,
      },
    });

    if (!existstingLike) {
      const like = await Like.create({
        liked,
        userId,
        postId,
      });
      return res.status(201).json(like);
    }

    existstingLike.destroy();

    return res.status(204).send();
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function httpToggleLikeDetail(req, res) {
  const { liked } = req.body;
  const { postId } = req.params;
  const { id: userId } = req.user;

  try {
    const existstingLike = await Like.findOne({
      where: {
        postId,
        userId,
      },
    });

    const exisitingPost = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!exisitingPost) return res.status(400).send();

    if (!existstingLike) {
      const like = await Like.create({
        liked,
        userId,
        postId,
      });
      return res.status(201).json(like);
    }

    existstingLike.destroy();
    return res.status(200).send();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  httpToggleLikeMain,
  httpToggleLikeDetail,
};
