'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('performanceDefinitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAcademicLoad: {
        allowNull: false,
        required: true,
        type: Sequelize.INTEGER,
        unique: 'PK_performanceDefinition',
        references: {
          model: 'AcademicLoads',
          key: 'id'
        }
      },
      idPerformance: {
        allowNull: false,
        required: true,
        type: Sequelize.INTEGER,
        unique: 'PK_performanceDefinition',
        references: {
          model: 'Performances',
          key: 'id'
        }
      },
      period: {
        allowNull: false,
        required: true,
        type: Sequelize.INTEGER,
        unique: 'PK_performanceDefinition'
      },
      description: {
        allowNull: false,
        required: true,
        type: Sequelize.STRING,
        default: 'Sin definir.'
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
    return queryInterface.dropTable('performanceDefinitions');
  }
};