'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SingleUserTopicMonitoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SingleUserTopicMonitoring.init({
    TopicID: DataTypes.STRING,
    Time: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    UserName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SingleUserTopicMonitoring',
  });
  return SingleUserTopicMonitoring;
};