const { sequelize, Post, User } = require("../../models/models");

async function httpGetAllPosts(req, res) {
  // When Passport is ready
  const { id } = req.user;

  const currentUser = User.findOne({
    where: {
      id: id,
    },
  });
  /* ------------------- comments? comment? binding ---------------------- */
  const posts = await Post.findAll({ include: "comment" });
  /* ------------------- comments? comment? binding ---------------------- */

  return res.json({ posts: posts, currentUser: currentUser });
}

async function httpAddPost(req, res) {
  const { content } = req.body;
  //  when Multer is ready
  const { imgUrl } = req.file.path;
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
  const { imgUrl } = req.file.path; //location????
  // // when passport is ready
  const { id: userId } = req.user;
  try {
    const existingPost = await Post.findOne({
      where: {
        id: postId,
        userId,
      },
    });
    existsPost.set({
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
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
}

async function httpGetOnePost(req, res) {
  const { postId } = req.params;
  //when passport is ready
  const { id: userId } = req.user;

  try {
    const post = Post.findOne({
      where: {
        id: postId,
        userId,
      },
    });

    return res.status(200).json(post);
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
