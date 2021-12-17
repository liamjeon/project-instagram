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

  const posts = await sequelize.query(
    `SELECT * FROM posts WHERE userId = ${userId} ORDER BY createdAt DESC`
  );

  res.status(200).json(posts[0]);
}

module.exports = {
  httpGetPostsByUserId,
};
