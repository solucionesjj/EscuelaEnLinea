'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addConstraint('GradeDefinitions', ['idAcademicLoad', 'grade', 'period'], { type: 'unique', name: 'UK_GradeDefinitions' })
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.removeConstraint('GradeDefinitions', 'UK_GradeDefinitions')
  }
};
