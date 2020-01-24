'use strict';
module.exports = (sequelize, DataTypes) => {
    const Matriculation = sequelize.define('Matriculation', {
        date: DataTypes.DATE,
        idStudent: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        sheet: DataTypes.STRING,
        number: DataTypes.STRING,
        idCourse: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: {
                model: 'Course',
                key: 'id'
            }
        }
    }, {});
    Matriculation.associate = function(models) {
        // associations can be defined here
    };
    return Matriculation;
};