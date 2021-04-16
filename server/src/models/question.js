"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Answers}) {
      // define association here
      this.hasMany(Answers, {foreignKey: 'question_id'})
    }
  }
  Question.init({
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    questionset_id: DataTypes.INTEGER,
    question: DataTypes.STRING,
    question_type: DataTypes.INTEGER,
    correct_answer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Question",
  });
  return Question;
};