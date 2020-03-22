'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      section: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        unique: 'PK_Section'
      },
      order: {
        type: Sequelize.INTEGER,
        required: true,
        allowNulls: false,
      },
      icon: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        default: 'mdi mdi-duck'
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
    return queryInterface.dropTable('Sections');
  }
};