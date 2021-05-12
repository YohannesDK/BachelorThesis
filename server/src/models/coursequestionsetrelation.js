'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseQuestionSetRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CourseQuestionSetRelation.init({
    CourseID: DataTypes.INTEGER,
    QuestionSetID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CourseQuestionSetRelation',
  });
  return CourseQuestionSetRelation;
};