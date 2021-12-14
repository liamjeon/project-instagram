const { sequelize, post, user } = require("../../models/models");

async function httpGetAllPosts(req, res) {
  // When Passport is ready
  const { id } = req.user;

  const currentUser = user.findOne({
    where: {
      id: id,
    },
  });
  const posts = await post.findAll({});

  return res.json({ posts: posts, currentUser: currentUser });
}

async function httpAddPost(req, res) {
  // const { content } = req.body;
  //  when Multer is ready
  // const { imgUrl } = req.file.path;
  //  when passport is ready
  // const { id } = req.user;

  // if (!content) return res.status(400);

  const newPost = post.create({
    userLiked: "userLiked",
    username : "username",
    content: "content",
    imgUrl: "imgUrl",
    UserId: 1,
  });

  return res.status(201).json(newPost);
}

async function httpEditPost(req, res) {
  const {postId} = req.params;
  const { content } = req.body;
  // when Multer is ready
  const { imgUrl } = req.file.path;
  // when passport is ready
  const { id } = req.user;
}

async function httpDeletePost(req, res) {}

async function httpGetOnePost(req, res) {}
module.exports = {
  httpGetAllPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpGetOnePost,
};
