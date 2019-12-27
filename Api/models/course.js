'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course: DataTypes.STRING,
    active: DataTypes.SMALLINT,
    order: DataTypes.INTEGER,
    year: DataTypes.SMALLINT
  }, {});
  Course.associate = function (models) {
    // associations can be defined here
  };
  return Course;
};