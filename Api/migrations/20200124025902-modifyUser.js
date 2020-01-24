'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'googleId'),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Users', 'googleId', Sequelize.STRING, {})
        ])
    }
};