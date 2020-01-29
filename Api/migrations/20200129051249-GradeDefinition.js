'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn('GradeDefinitions', 'period', Sequelize.INTEGER, { required: true, allowNull: false}),
      queryInterface.addColumn('GradeDefinitions', 'weight', Sequelize.INTEGER, {required: true, allowNull: false})
      
  ])
  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn('GradeDefinitions', 'period'),
      queryInterface.removeColumn('GradeDefinitions', 'weight')
  ])
  }
};
