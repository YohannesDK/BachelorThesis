'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TopicMonitorings', {
      TopicID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      TopicName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      DocumentID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      CourseID: {
        allowNull: false,
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
    await queryInterface.dropTable('TopicMonitorings');
  }
};