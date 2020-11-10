'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Faults', ['idMatter'], {
            type: 'foreign key',
            name: 'FK_Fault_Matter_idMatter',
            references: {
                table: 'Matters',
                field: 'id'
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Faults', 'FK_Fault_Matter_idMatter');
    }
};