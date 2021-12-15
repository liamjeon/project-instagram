const express = require("express");
const UserController = require('./user.controller.js');

const userController = new UserController();
const router = express.Router();
// loginId dup check api
// router.post("/loginId", userController.checkLoginId);

// signup api
router.post("/signup", userController.signup);

// login api
router.post("/login", userController.login);

module.exports = router;
