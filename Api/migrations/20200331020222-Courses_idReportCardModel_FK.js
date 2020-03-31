'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Courses', ['idReportCardModel'], {
      type: 'foreign key',
      name: 'FK_Courses_ReportCardModel_idReportCardModel',
      references: {
        table: 'ReportCardModels',
        field: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Courses','FK_Courses_ReportCardModel_idReportCardModel');
  }
};