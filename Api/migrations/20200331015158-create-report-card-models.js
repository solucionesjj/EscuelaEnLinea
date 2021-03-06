'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ReportCardModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        required: true
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      header: {
        type: Sequelize.TEXT
      },
      body: {
        type: Sequelize.TEXT
      },
      footer: {
        type: Sequelize.TEXT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ReportCardModels');
  }
};