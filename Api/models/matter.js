'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matter = sequelize.define('Matter', {
    matter: DataTypes.STRING,
    idArea: DataTypes.INTEGER
  }, {});
  Matter.associate = function(models) {
    // associations can be defined here
  };
  return Matter;
};