'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.SMALLINT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};