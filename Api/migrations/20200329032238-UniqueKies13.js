'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addConstraint('Sections', ['section'], { type: 'unique', name: 'UK_Sections' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Sections', 'UK_Sections')
  }
};
