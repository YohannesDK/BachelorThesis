'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignmentTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AssignmentTest.init({
    TestID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    AssignmentID: DataTypes.INTEGER,
    TestDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssignmentTest',
  });
  AssignmentTest.removeAttribute("id");
  return AssignmentTest;
};