"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionsetDocumentRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionsetDocumentRelation.init({
    questionset_id: { 
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    document_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  }, {
    sequelize,
    modelName: "QuestionsetDocumentRelation",
  });
  return QuestionsetDocumentRelation;
};