'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignmentReading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AssignmentReading.init({
    ReadingID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    AssignmentID: DataTypes.NUMBER,
    ReadingDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssignmentReading',
  });
  AssignmentReading.removeAttribute("id");
  return AssignmentReading;
};