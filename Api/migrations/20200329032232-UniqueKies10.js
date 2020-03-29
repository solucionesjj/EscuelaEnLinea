'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Parameters', ['parameter'], { type: 'unique', name: 'UK_Parameters' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Parameters', 'UK_Parameters')
  }
};
