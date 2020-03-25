'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Performances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      performance: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: 'UK_Performances'
      },
      from: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        required: true,
        default: 0
      },
      to: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        default: 0
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
    return queryInterface.dropTable('Performances');
  }
};