'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Faults', ['idCourse'], {
            type: 'foreign key',
            name: 'FK_Fault_Course_idCourse',
            references: {
                table: 'Courses',
                field: 'id'
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Faults', 'FK_Fault_Course_idCourse');
    }
};