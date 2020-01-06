'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false
    },
    active: {
      type: DataTypes.SMALLINT, 
      required: true,
      allowNulls: false,
      default: 1
    },
    order: {
      type: DataTypes.SMALLINT, 
      required: true,
      allowNulls: false,
      default: 1
    },
    year: DataTypes.SMALLINT
  }, {});
  Course.associate = function (models) {
    // associations can be defined here
  };
  return Course;
};