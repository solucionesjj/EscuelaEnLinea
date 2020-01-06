'use strict';
module.exports = (sequelize, DataTypes) => {
  const AcademicLoad = sequelize.define('AcademicLoad', {
    idCourse: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'Course',
        key: 'id'
      }
    },
    idMatter: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'Matter',
        key: 'id'
      }
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    hoursPerWeek: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      defaultValue: 1
    }
  }, {});
  AcademicLoad.associate = function (models) {
    // associations can be defined here
  };
  return AcademicLoad;
};