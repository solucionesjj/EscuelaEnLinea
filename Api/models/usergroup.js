'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    idUser: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    idGroup: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id'
      }
    }
  }, {});
  UserGroup.associate = function (models) {
    // associations can be defined here
  };
  return UserGroup;

};