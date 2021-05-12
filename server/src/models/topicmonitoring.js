'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TopicMonitoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TopicMonitoring.init({
    TopicID: DataTypes.STRING,
    TopicName: DataTypes.STRING,
    Time: DataTypes.INTEGER,
    DocumentID: DataTypes.INTEGER,
    CourseID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TopicMonitoring',
  });
  TopicMonitoring.removeAttribute("id");
  return TopicMonitoring;
};