'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AttemptData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttemptId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      QuestionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      QuestionType: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      TextAnswer: {
        type: Sequelize.STRING
      },
      ChoiceAnswer: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AttemptData');
  }
};