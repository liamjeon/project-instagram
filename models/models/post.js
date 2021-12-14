"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, like }) {
      // define association here
      this.belongsTo(User);
      this.hasMany(like);
    }
  }
  Post.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userLiked: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return Post;
};
