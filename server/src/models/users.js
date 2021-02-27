"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({courses}) {
      console.log({courses})
      users.belongsToMany(courses, {through: "userCourses", as: "userToCourse", foreignKey: "userId"})
      // users.hasMany(models.Post, {
      //   onDelete: "cascade"
      // });
      // define association here
    }
  }
  users.init({
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: "users",
  });
  return users;
};