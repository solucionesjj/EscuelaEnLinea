'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AcademicLoads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCourse: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id'
        }
      },
      idMatter: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        references: {
          model: 'Matters',
          key: 'id'
        }
      },
      idTeacher: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      hoursPerWeek: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        defaultValue: 1
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
    return queryInterface.dropTable('AcademicLoads');
  }
};