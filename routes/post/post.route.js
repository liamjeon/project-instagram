const postRouter = require("express").Router();
const { upload } = require("../../middlewares/middlewares");
const authenticateUser = require("../../middlewares/auth.middleware");
const {
  httpGetAllPosts,
  httpAddPost,
  httpEditPost,
  httpDeletePost,
  httpGetOnePost,
} = require("./post.controller");

// get all posts MAIN
postRouter.get("/", authenticateUser, httpGetAllPosts);
// add post to db
postRouter.post("/", authenticateUser, upload.array("imgUrl", 5), httpAddPost);
// edit post
postRouter.put("/:postId", authenticateUser, httpEditPost);
//delete post
postRouter.delete("/:postId", authenticateUser, httpDeletePost);
//get detail
postRouter.get("/:postId", authenticateUser, httpGetOnePost);

module.exports = postRouter;
