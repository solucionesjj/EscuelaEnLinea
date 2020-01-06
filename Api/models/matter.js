'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matter = sequelize.define('Matter', {
    matter: {
      type: DataTypes.STRING,
      unique: 'UK_Matter',
      allowNull: false,
      required: true
    },
    idArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: 'Areas',
        key: 'id'
      }
    }
  }, {});
  Matter.associate = function (models) {
    // associations can be defined here
  };
  return Matter;
};