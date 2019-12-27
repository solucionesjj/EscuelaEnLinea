'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Courses', 'order', Sequelize.INTEGER, { after: 'active' }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Courses', 'order')
};
