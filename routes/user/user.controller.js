const UserRepository = require("./user.data.js");
const userRepository = new UserRepository();
const bcrypt = require("bcrypt");

class UserController {
  async signup(req, res, next) {
    const { username, fullname, email, password } = req.body;
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const isUser = await userRepository.findByUsername(username);

    if (isUser) {
      return res.status(400).json("이미 등록된 유저가 있습니다");
    } else {
      try {
        await userRepository.create(username, fullname, email, hashedPassword);
        return res.sendStatus(201);
      } catch {
        return res.status(400).json("회원가입 실패");
      }
    }
  }
}

module.exports = UserController;
