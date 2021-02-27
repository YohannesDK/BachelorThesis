"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      console.log(courses)
      this.belongsToMany(users, {through: "userCourses", as: "courseToUser", foreignKey: "courseId"})
      // define association here
    }
  }
  courses.init({
    body: DataTypes.STRING,
    shorthand: DataTypes.STRING,
    coursePassword: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "courses",
  });
  return courses;
};