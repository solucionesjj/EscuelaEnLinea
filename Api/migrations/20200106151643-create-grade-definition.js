'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GradeDefinitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAcademicLoad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
          model: 'AcademicLoads',
          key: 'id'
        }
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        required: true,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      grade: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: 'Sin descripción.'
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
    return queryInterface.dropTable('GradeDefinitions');
  }
};