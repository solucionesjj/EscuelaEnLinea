'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Matriculations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            idStudent: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            sheet: {
                type: Sequelize.STRING
            },
            number: {
                type: Sequelize.STRING
            },
            idCourse: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
                references: {
                    model: 'Courses',
                    key: 'id'
                }
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Matriculations');
    }
};