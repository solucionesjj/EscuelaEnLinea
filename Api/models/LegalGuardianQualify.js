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
        bimestre: {
            allowNull: false,
            required: true,
            type: DataTypes.INTEGER
        },
        idLegalGuardianQualifyCatalog: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: {
                model: 'Aspects',
                key: 'id'
            }
        },
    }, { freezeTableName: true, });
    LegalGuardianQualify.associate = function (models) {
        // associations can be defined here
    };
    return LegalGuardianQualify;
};