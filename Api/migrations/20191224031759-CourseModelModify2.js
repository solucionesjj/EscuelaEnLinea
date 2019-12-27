'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Courses', 'year', Sequelize.SMALLINT, { after: 'order' }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Courses', 'year')
};
