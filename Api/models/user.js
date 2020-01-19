'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: 'UK_User'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      defaultValue: 'Sin clave.'
    },
    active:  {
      type: DataTypes.SMALLINT,
      allowNull: false,
      required: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      defaultValue: 'Sin id.'
    },
    surname: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    identificationDocument: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    identificationDocumentType: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    identificationDocumentExpeditionSite: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
    },
    gender:{
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};