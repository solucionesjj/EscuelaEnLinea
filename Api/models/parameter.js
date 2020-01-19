'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parameter = sequelize.define('Parameter', {
    parameter: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  Parameter.associate = function(models) {
    // associations can be defined here
  };
  return Parameter;
};