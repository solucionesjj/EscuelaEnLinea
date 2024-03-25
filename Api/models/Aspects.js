'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aspects = sequelize.define('Aspects', {
    aspect: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
  }, {freezeTableName: true,});
  Aspects.associate = function (models) {
    // associations can be defined here
  };
  return Aspects;
};