'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Attempts.init({
    AttemptId:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    Time: DataTypes.INTEGER,
    Score: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    questionset_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attempts',
  });
  return Attempts;
};