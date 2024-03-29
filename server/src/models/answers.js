"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Question}) {
      // define association here
      this.belongsTo(Question, {foreignKey: 'question_id'})
    }
  }
  Answers.init({
    answer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: DataTypes.INTEGER,
    answer_option: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Answers",
  });
  return Answers;
};