const req = require("express/lib/request");
const { sequelize, Post, User } = require("../../models/models");
const post = require("../../models/models/post");
const user = require("../../models/models/user");

async function httpGetAllPosts(req, res) {
  // When Passport is ready
  const { id } = req.user;

  const currentUser = await User.findOne({
    where: {
      id: id,
    },
  });

  //like
  const posts = await sequelize.query(
    "SELECT *, (SELECT COUNT(*) FROM likes where postId = posts.id) AS numOfLikes, (SELECT COUNT(*) FROM comments where postId = posts.id) AS numOfComments FROM posts"
  );

  const likedPosts = await sequelize.query(
    `SELECT postId FROM likes WHERE userId = ${currentUser.id}`
  );

  const likedPostList = likedPosts[0].map((post) => post.postId);

  return res.json({
    post: posts[0],
    currentUserId: currentUser.id,
    likedPostList,
  });
}

async function httpAddPost(req, res) {
  const { content } = req.body;
  //  when Multer is ready
  const imgUrl = req.file.path;
  console.log(req.file.path);

  //  when passport is ready
  const { id: userId, username } = req.user;

  if (!content) return res.status(400);

  try {
    const newPost = await Post.create({
      username,
      content,
      imgUrl,
      userId,
    });
    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
}

async function httpEditPost(req, res) {
  const { postId } = req.params;
  const { content } = req.body;
  // when Multer is ready
  const imgUrl = req.file.path;
  // // when passport is ready
  const { id: userId } = req.user;
  try {
    const existingPost = await Post.findOne({
      where: {
        id: postId,
        userId,
      },
    });
    existingPost.set({
      content,
      imgUrl,
    });

    const updatedPost = await existingPost.save();

    res.status(201).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
}

async function httpDeletePost(req, res) {
  const { postId } = req.params;
  // When passport is ready
  const { id: userId } = req.user;
  try {
    const existingPost = await Post.findOne({
      where: {
        id: postId,
        userId,
      },
    });

    await existingPost.destroy();
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
}

async function httpGetOnePost(req, res) {
  const { postId } = req.params;
  //when passport is ready
  // const { id: userId } = req.user;

  try {
    const post = await sequelize.query(
      `SELECT*,(SELECT COUNT(*) FROM likes where postId=${postId} ) AS numOfLikes,(SELECT COUNT(*) FROM comments where postId=${postId}) AS numOfComments FROM posts WHERE id = ${postId}`
    );

    // console.log(post[0].length);

    if (post[0].length === 0) {
      return res.status(404).send();
    }

    return res.status(200).json(post[0]);
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
}
module.exports = {
  httpGetAllPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpGetOnePost,
};
