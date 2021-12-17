const myPageRouter = require("express").Router();
const { upload } = require("../../../middlewares/middlewares");
const authenticateUser = require("../../../middlewares/auth.middleware");
const {
  httpGetPostsByUserId,
  httpUpdateUserProfile,
} = require("./myPage.controller");

myPageRouter.get("/:userId", authenticateUser, httpGetPostsByUserId);
myPageRouter.post("/:userId/upload", authenticateUser, httpUpdateUserProfile);

module.exports = myPageRouter;

// profileUrl;
