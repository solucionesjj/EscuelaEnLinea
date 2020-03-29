'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('AcademicLoads', ['idCourse', 'idMatter', 'idTeacher'], { type: 'unique', name: 'UK_AcademicLoads' })
  },

  down: (queryInterface, Sequelize) => {
    return ueryInterface.removeConstraint('AcademicLoads', 'UK_AcademicLoads')
  }
};
