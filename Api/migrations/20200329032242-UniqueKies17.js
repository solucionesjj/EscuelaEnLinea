'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Matters', ['matter', 'idArea'], { type: 'unique', name: 'UK_Matters' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Matters', 'UK_Matters')
  }
};
