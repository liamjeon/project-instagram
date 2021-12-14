const postRouter = require("express").Router();
const {
  httpGetAllPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpGetOnePost,
} = require("./post.controller");

// get all posts MAIN
postRouter.get("/", httpGetAllPosts);
// add post to db
postRouter.post("/:postId", httpAddPost);
// edit post
postRouter.put("/", httpEditPost);
//delete post
postRouter.delete("/:postId", httpDeletePost);
//get detail?
postRouter.get("/:postId", httpGetOnePost);

module.exports = postRouter;
