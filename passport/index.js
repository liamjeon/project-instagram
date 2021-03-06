const passport = require("passport");
const local = require("./localStrategy.js");
const { User } = require("../models/models/index.js");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //세션에 user의 id만 저장
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(); //local 등록
};
