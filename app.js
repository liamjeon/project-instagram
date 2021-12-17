const express = require("express");
const path = require("path");
const passport = require("passport");
const commentRouter = require("./routes/comment/comment.route.js");
const userRouter = require("./routes/user/user.route.js");
const myPageRouter = require("./routes/post/users/myPage.route.js");
const postRouter = require("./routes/post/post.route");
const likeRouter = require("./routes/like/like.route.js");

const passportConfig = require("./passport/index.js");
const cors = require("cors");

const app = express();
passportConfig();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/Images", express.static(path.join(__dirname, "Images")));

app.use("/posts", postRouter);
app.use("/posts", commentRouter);
app.use("/posts", likeRouter);
app.use("/auth", userRouter);
app.use("/users", myPageRouter);

//예외 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

module.exports = app;
