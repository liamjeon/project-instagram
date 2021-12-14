const express = require("express");
const commentRouter = require("./routes/comment/comment.route.js")
const postRouter = require("./routes/post/post.route.js")

const app = express();

app.use(express.json());
app.use("/api/posts", commentRouter);
app.use('/api/posts', postRouter)


//예외 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

module.exports = app;
