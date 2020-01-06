'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matter: {
        type: Sequelize.STRING,
        unique: 'UK_Matters',
        allowNull: false,
        required: true
      },
      idArea: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: 'Areas',
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
    return queryInterface.dropTable('Matters');
  }
};