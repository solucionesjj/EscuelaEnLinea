'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    area: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {});
  Area.associate = function(models) {
    // associations can be defined here
  };
  return Area;
};