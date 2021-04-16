'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignmentModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AssignmentModule.init({
    AssignmentID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    courseID: DataTypes.INTEGER,
    AssignmentName: DataTypes.STRING,
    Date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssignmentModule',
  });
  AssignmentModule.removeAttribute("id");
  return AssignmentModule;
};