"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AnswerSet extends Model {
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
  AnswerSet.init({
    answerset_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    correct_answer: DataTypes.INTEGER,
    question_id: {
      foreignKey: true,
      type: DataTypes.INTEGER
    } 
  }, {
    sequelize,
    modelName: "AnswerSet",
  });
  return AnswerSet;
};