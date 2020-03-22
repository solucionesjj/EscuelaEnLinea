'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupComponent = sequelize.define('GroupComponent', {
    idGroup: {
      type: DataTypes.INTEGER,
      required: true,
      allowNulls: false,
      unique: 'PK_GroupComponent',
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    idComponent: {
      type: DataTypes.INTEGER,
      required: true,
      allowNulls: false,
      unique: 'PK_GroupComponent',
      references: {
        model: 'Component',
        key: 'id'
      }
    }
  }, {});
  GroupComponent.associate = function (models) {
    // associations can be defined here
  };
  return GroupComponent;
};