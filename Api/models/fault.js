'use strict';
module.exports = (sequelize, DataTypes) => {
    const Fault = sequelize.define('Fault', {
        idCourse: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
            unique: 'UK_Fault',
            references: {
                model: 'Course',
                key: 'id'
            }
        },
        idMatter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
            unique: 'UK_Fault',
            references: {
                model: 'Matter',
                key: 'id'
            }
        },
        idStudent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
            unique: 'UK_Fault',
            references: {
                model: 'User',
                key: 'id'
            }
        },
        period: {
            type: DataTypes.INTEGER,
            required: true,
            allowNulls: false,
            unique: 'UK_Fault',
            default: 0
        },
        faults: {
            type: DataTypes.INTEGER,
            required: true,
            allowNulls: false,
            default: 0
        }
    }, {});
    Fault.associate = function(models) {
        // associations can be defined here
    };
    return Fault;
};