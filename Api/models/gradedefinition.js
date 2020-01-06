'use strict';
module.exports = (sequelize, DataTypes) => {
  const GradeDefinition = sequelize.define('GradeDefinition', {
    idAcademicLoad: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'AcademicLoad',
        key: 'id'
      }
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    grade: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'Sin descripción.'
    }
  }, {});
  GradeDefinition.associate = function (models) {
    // associations can be defined here
  };
  return GradeDefinition;
};