const express = require("express");
const cors = require("cors");

const app = express();

const postRouter = require("./routes/post/post.route");

app.use(express.urlencoded());
app.use(express.json());
// for Multer
app.use("/Images", express.static("./Images"));

app.use("/api/posts", postRouter);

module.exports = app;
