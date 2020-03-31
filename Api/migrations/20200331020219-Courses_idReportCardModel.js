'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Courses', 'idReportCardModel', Sequelize.INTEGER, {})
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.removeColumn('Courses', 'idReportCardModel')
  }
};
