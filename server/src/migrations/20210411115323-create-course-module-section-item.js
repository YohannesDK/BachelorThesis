'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourseModuleSectionItems', {
      ItemID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SectionID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Item: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ItemLink: {
        type: Sequelize.STRING
      },
      ItemResourceID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ItemType: {
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
    await queryInterface.dropTable('CourseModuleSectionItems');
  }
};