'use strict';
module.exports = (sequelize, DataTypes) => {
  const GradeInformation = sequelize.define('GradeInformation', {
    idGradeDefinition: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: 'GradeDefinition',
        key: 'id'
      }
    },
    idStudent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true
    },
    grade: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      required: true
    }
  }, {});
  GradeInformation.associate = function (models) {
    // associations can be defined here
  };
  return GradeInformation;
};