'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseModuleSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CourseModule, {sourceKey: 'courseModuleID', foreignKey: 'fk_courseModuleID', targetKey: 'courseModuleID'})
    }
  };
  CourseModuleSection.init({
    SectionID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    courseModuleID: DataTypes.INTEGER,
    SectionName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseModuleSection',
  });
  CourseModuleSection.removeAttribute("id");
  return CourseModuleSection;
};