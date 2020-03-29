'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Areas', ['area'], { type: 'unique', name: 'UK_Areas' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Areas', 'UK_Areas')
  }
};
