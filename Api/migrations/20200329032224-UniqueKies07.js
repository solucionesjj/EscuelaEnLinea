'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addConstraint('Groups', ['group'], { type: 'unique', name: 'UK_Groups' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Groups', 'UK_Groups')
  }
};
