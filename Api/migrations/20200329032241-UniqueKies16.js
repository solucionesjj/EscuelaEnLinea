'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Matriculations', ['idCourse', 'idStudent'], { type: 'unique', name: 'UK_Matriculations' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Matriculations', 'UK_Matriculations')
  }
};
