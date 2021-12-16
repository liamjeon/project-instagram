"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, { foreignKey: "userId" });
      this.hasMany(models.Post, { foreignKey: "userId" });
      this.hasMany(models.Like, { foreignKey: "userId" });
      // this.hasMany(models.Like, foreignKey:"userId")
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      follower: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      following: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
