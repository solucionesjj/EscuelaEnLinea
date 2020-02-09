'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('GradeInformations', 'grade', Sequelize.DECIMAL(10,2), {
      allowNull: false,
      required: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('GradeInformations', 'grade', Sequelize.DECIMAL, {
      allowNull: false,
      required: true
    });
  }
};
