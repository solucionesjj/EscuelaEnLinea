'use strict';
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    component: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      unique: 'UK_Component'
    },
    action: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      default: '',
      unique: 'UK_Component'
    },
    title: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      default: ''
    },
    showInMenu: {
      type: DataTypes.BOOLEAN,
      required: true,
      allowNulls: false,
      default: false
    },
    menuTitle: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      default: ''
    },
    routerLink: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      default: ''
    },
    menuOrder: { 
      type: DataTypes.INTEGER,
      default: 0
    }
  }, {});
  Component.associate = function(models) {
    // associations can be defined here
  };
  return Component;
};