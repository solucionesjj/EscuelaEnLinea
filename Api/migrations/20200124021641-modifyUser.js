'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Users', 'idFather', Sequelize.INTEGER, {}),
            queryInterface.addColumn('Users', 'idMother', Sequelize.INTEGER, {}),
            queryInterface.addColumn('Users', 'telephoneOne', Sequelize.STRING, {}),
            queryInterface.addColumn('Users', 'telephoneTwo', Sequelize.STRING, {}),
            queryInterface.addColumn('Users', 'address', Sequelize.STRING, {}),
            queryInterface.addColumn('Users', 'rh', Sequelize.STRING, {})
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'idFather'),
            queryInterface.removeColumn('Users', 'idMother'),
            queryInterface.removeColumn('Users', 'telephoneOne'),
            queryInterface.removeColumn('Users', 'telephoneTwo'),
            queryInterface.removeColumn('Users', 'address'),
            queryInterface.removeColumn('Users', 'rh')
        ])
    }
};