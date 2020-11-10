'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Faults', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idCourse: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
            },
            idMatter: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
            },
            idStudent: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
            },
            period: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
            },
            faults: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Faults');
    }
};