'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Components', ['idSection', 'component', 'action'], { type: 'unique', name: 'UK_Components' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Components', 'UK_Components')
  }
};
