'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Courses', ['idDirector'], {
      type: 'foreign key',
      name: 'FK_Courses_Users_idDirector',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Courses','FK_Courses_Users_idDirector');
  }
};
