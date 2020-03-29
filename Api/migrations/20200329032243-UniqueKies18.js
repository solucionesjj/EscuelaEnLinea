'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('performanceDefinitions', ['idAcademicLoad', 'idPerformance', 'period'], { type: 'unique', name: 'UK_performanceDefinitions' })
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.removeConstraint('performanceDefinitions', 'UK_performanceDefinitions')
  }
};
