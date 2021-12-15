const likeRouter = require("express").Router();
const authenticateUser = require("../../middlewares/auth.middleware");

const {
  httpToggleLikeMain,
  httpToggleLikeDetail,
} = require("./like.controller");

likeRouter.post("/likes", authenticateUser, httpToggleLikeMain);
likeRouter.post("/:postId/likes", authenticateUser, httpToggleLikeDetail);

module.exports = likeRouter;
