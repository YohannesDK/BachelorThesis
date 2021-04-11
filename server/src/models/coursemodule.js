'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.courses, {foreignKey: 'courseId', targetKey: 'id'})
    }
  };
  CourseModule.init({
    courseModuleID: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    moduleOrderIndex: DataTypes.INTEGER,
    public: DataTypes.BOOLEAN,
    moduleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseModule',
  });
  return CourseModule;
};