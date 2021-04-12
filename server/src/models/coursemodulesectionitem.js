'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseModuleSectionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CourseModuleSection, {sourceKey: 'SectionID', foreignKey: 'fk_SectionID', targetKey: 'SectionID'})
    }
  };
  CourseModuleSectionItem.init({
    ItemID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    SectionID: DataTypes.INTEGER,
    Item: DataTypes.STRING,
    ItemLink: DataTypes.STRING,
    ItemResourceID: DataTypes.INTEGER,
    ItemType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CourseModuleSectionItem',
  });
  CourseModuleSectionItem.removeAttribute("id");
  return CourseModuleSectionItem;
};