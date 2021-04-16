"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Questions", {
      question_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionset_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      question: {
        allowNull: false,
        type: Sequelize.STRING
      },
      question_type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      correct_answer: {
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
    await queryInterface.dropTable("Questions");
  }
};