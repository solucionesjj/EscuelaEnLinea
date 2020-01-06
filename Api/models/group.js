'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'UK_Group',
      required: true
    }
  }, {});
  Group.associate = function (models) {
    // associations can be defined here
  };
  return Group;
};