'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GradeInformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idGradeDefinition: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: 'GradeDefinitions', 
          key: 'id'
        }
      },
      idStudent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: 'Users', 
          key: 'id'
        }
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
      },
      grade: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        required: true
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
    return queryInterface.dropTable('GradeInformations');
  }
};