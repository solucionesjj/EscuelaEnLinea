'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Faults', ['idCourse', 'idMatter', 'idStudent', 'period'], { type: 'unique', name: 'UK_Faults' })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Faults', 'UK_Faults')
    }
};