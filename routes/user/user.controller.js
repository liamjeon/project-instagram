const UserRepository = require("./user.data.js");
const userRepository = new UserRepository();
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const JWT_SECRETKEY = "key_instagram";
const JWT_EXPRIERSDAYS = "1d";

class UserController {
  async signup(req, res, next) {
    const { username, fullname, email, password } = req.body;
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const isUser = await userRepository.findByEmail(email);

    if (isUser) {
      return res.status(400).json("이미 등록된 유저가 있습니다");
    }
    try {
      await userRepository.create(username, fullname, email, hashedPassword);
      return res.sendStatus(201);
    } catch {
      return res.status(400).json("회원가입 실패");
    }
  }

  async login(req, res, next) {
    //local이 실행되면 passport가 localStrategy를 찾음
    //local은 passport/localStrategy에서 등록해 놓았기게 localStoragy로 이동함
    //local 에서 done함수를 호출하면 다음 미들웨어로 넘어감.
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        //서버에러
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        //로그인 실패
        return res.status(401).json(info.message);
      }
      //req.login 호출시 passport/index 로 이동하고 ,serializeUser가 실행됨
      //serializeUser 에서 done 호출하면 다음 함수로 넘어감
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        //Todo
        //여기서 (숨겨진 과정)세션쿠키를 브라우저에게 보내줌

        //jwt token생성
        const token = jwt.sign({ id: user.id }, JWT_SECRETKEY, {
          expiresIn: JWT_EXPRIERSDAYS,
        });
        return res.status(200).json({ token, username: user.username, fullname: user.fullname});
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙임
  }

  //logout
  async logout(req, res, next) {
    req.logout();
    req.session.destroy();
  }
}

module.exports = UserController;
