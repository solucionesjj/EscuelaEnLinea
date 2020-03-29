'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Performances', ['performance'], { type: 'unique', name: 'UK_Performances' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Performances', 'UK_Performances')
  }
};
