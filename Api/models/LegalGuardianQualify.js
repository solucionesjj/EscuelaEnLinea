'use strict';
module.exports = (sequelize, DataTypes) => {
    const LegalGuardianQualify = sequelize.define('LegalGuardianQualify', {
        idMatriculations: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: {
                model: 'Matriculation',
                key: 'id'
            }
        },
        period: {
            allowNull: false,
            required: true,
            type: DataTypes.INTEGER
        },
        idLegalGuardianQualifyCatalog: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: {
                model: 'LegalGuardianQualifyCatalog',
                key: 'id'
            }
        },
    }, { freezeTableName: true, });
    LegalGuardianQualify.associate = function (models) {
        // associations can be defined here
    };
    return LegalGuardianQualify;
};