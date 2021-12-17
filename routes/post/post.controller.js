const { sequelize, Post, User, Comment, Like } = require("../../models/models");

async function httpGetAllPosts(req, res) {
  // When Passport is ready
  const { id } = req.user;
  let liked;

  const currentUser = await User.findOne({
    where: {
      id: id,
    },
  });

  // let postss = await Post.findAll();

  // postss = postss.map(async (post)=>{
  //   const numOfLikes = await Like.count({
  //     where:{
  //       postId : post.id,
  //     }
  //   });
  //   post.numOfLikes = numOfLikes;
  //   // console.log(numOfLikes);
  // });

  

  // (SELECT * FROM likes WHERE userId = ${id} ) AS liked
  // , (SELECT postId FROM likes WHERE likes.userId = ${id})
  const posts = await sequelize.query(
    `SELECT *, (SELECT COUNT(*) FROM likes WHERE postId = posts.id) AS numOfLikes, (SELECT COUNT(*) FROM comments WHERE postId = posts.id) AS numOfComments FROM posts ORDER BY createdAt DESC`
  );

  const likedPosts = await sequelize.query(
    `SELECT postId FROM likes WHERE userId = ${currentUser.id}`
  );

  const likedPostList = likedPosts[0].map((post) => post.postId);



  return res.json({
    posts,
    likedPostList,
  });
}

async function httpAddPost(req, res) {
  const baseUrl = "http://13.125.132.120/";
  // const baseUrl = "http://localhost:5000/";
  const { content } = req.body;
  //  when Multer is ready
  const imgs = req.files.map((file) => `${baseUrl}${file.path}`);
  const imgUrl = imgs.join(",");

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
  const { id: userId } = req.user;
  let liked;

  try {
    const post = await sequelize.query(
      `SELECT*,(SELECT COUNT(*) FROM likes where postId=${postId} ) AS numOfLikes,(SELECT COUNT(*) FROM comments where postId=${postId}) AS numOfComments FROM posts WHERE id = ${postId}`
    );

    const comments = await sequelize.query(
      `SELECT *,(SELECT profileUrl FROM users WHERE id = comments.userId) AS profileUrl FROM comments`
    );

    const exsitingLike = await Like.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (!exsitingLike) {
      liked = false;
    } else {
      liked = true;
    }

    if (post[0].length === 0) {
      return res.status(404).send();
    }

    return res
      .status(200)
      .json({ post: post[0], liked, comments: comments[0] });
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
