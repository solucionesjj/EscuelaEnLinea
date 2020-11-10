'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Faults', ['idStudent'], {
            type: 'foreign key',
            name: 'FK_Fault_User_idStudent',
            references: {
                table: 'Users',
                field: 'id'
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Faults', 'FK_Fault_User_idStudent');
    }
};