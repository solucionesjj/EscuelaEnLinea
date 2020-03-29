'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserGroups', ['idUser', 'idGroup'], { type: 'unique', name: 'PK_UserGroups' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserGroups', 'PK_UserGroups')
  }
};
