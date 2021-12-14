"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ post, user }) {
      // define association here
      this.belongsTo(post);
      this.belongsTo(user);
    }
  }
  like.init(
    {
      liked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "like",
    }
  );
  return like;
};
