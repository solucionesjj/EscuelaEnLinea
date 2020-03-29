'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Courses', ['course', 'year'], { type: 'unique', name: 'UK_Courses' })
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.removeConstraint('Courses', 'UK_Courses')
  }
};
