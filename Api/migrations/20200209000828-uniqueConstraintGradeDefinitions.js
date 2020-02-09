'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('GradeInformations', ['idGradeDefinition','idStudent','period'], {
      type: 'unique',
      name: 'UK_GradeInformations'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('GradeInformations','UK_GradeInformations');
  }
};