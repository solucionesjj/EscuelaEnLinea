'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupComponents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idGroup: {
        type: Sequelize.INTEGER,
        required: true,
        allowNulls: false,
        unique: 'PK_GroupComponent',
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      idComponent: {
        type: Sequelize.INTEGER,
        required: true,
        allowNulls: false,
        unique: 'PK_GroupComponent',
        references: {
          model: 'Components',
          key: 'id'
        }
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
    return queryInterface.dropTable('GroupComponents');
  }
};