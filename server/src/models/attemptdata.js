'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttemptData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AttemptData.init({
    AttemptId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    QuestionId: DataTypes.INTEGER,
    QuestionType: DataTypes.INTEGER,
    TextAnswer: DataTypes.STRING,
    ChoiceAnswer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AttemptData',
  });
  return AttemptData;
};