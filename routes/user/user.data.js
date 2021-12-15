const { User } = require("../../models/models");

class UserRepository {
  async create(username, fullname, email, password) {
    return User.create({
      username,
      fullname,
      email,
      password,
      follower: "anyone",
      following: "anyone",
    });
  }

  async findByUsername(username) {
    return User.findOne({ where: { username } });
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findById(userId) {
    return User.findByPk(userId);
  }
}

module.exports = UserRepository;
