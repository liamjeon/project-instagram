const express = require("express");
const validateAuth = require('../../middlewares/validator.middleware.js')
const UserController = require('./user.controller.js');

const userController = new UserController();
const router = express.Router();
// loginId dup check api
// router.post("/loginId", userController.checkLoginId);

// signup api
router.post("/signup", validateAuth, userController.signup);

// login api
router.post("/login", userController.login);

module.exports = router;
