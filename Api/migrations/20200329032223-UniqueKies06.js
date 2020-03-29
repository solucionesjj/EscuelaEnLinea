'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('GroupComponents', ['idGroup', 'idComponent'], { type: 'unique', name: 'UK_GroupComponents' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('GroupComponents', 'UK_GroupComponents')
  }
};
