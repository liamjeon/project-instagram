const express = require("express");
const passport = require('passport');
const commentRouter = require("./routes/comment/comment.route.js")
const userRouter = require("./routes/user/user.route.js")
const passportConfig = require('./passport/index.js');

const app = express();
passportConfig();

app.use(express.json());
app.use(passport.initialize());


app.use("/posts", commentRouter);
app.use("/auth", userRouter);
// app.use('/api/posts', postRouter)

//예외 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

module.exports = app;
