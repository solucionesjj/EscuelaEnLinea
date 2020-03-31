'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ReportCardModels', ['name'], {
      type: 'unique',
      name: 'UK_ReportCardModels'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ReportCardModels','UK_ReportCardModels');
  }
};
