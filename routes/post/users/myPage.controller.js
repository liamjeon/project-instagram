const {
  sequelize,
  Post,
  User,
  Comment,
  Like,
} = require("../../../models/models");

async function httpGetPostsByUserId(req, res) {
  console.log(req);
  const { userId } = req.params;
  const user = req.user;

  try {
    const posts = await sequelize.query(
      `SELECT * FROM posts WHERE userId = ${userId} ORDER BY createdAt DESC`
    );

    res.status(200).json({ posts: posts[0], user });
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
}

async function httpUpdateUserProfile(req, res) {
  const { userId } = req.params;
  const profileUrl = req.file.path;
  console.log(profileUrl);

  try {
    const user = await User.findOne({ where: { id: userId } });
    // console.log(user);

    const updatedUser = await user.set({
      profileUrl,
    });

    await updatedUser.save();

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

module.exports = {
  httpGetPostsByUserId,
  httpUpdateUserProfile,
};
