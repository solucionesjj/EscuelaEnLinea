'use strict';
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    idSection: {
      type: DataTypes.INTEGER,
      required: true,
      allowNulls: false,
      unique: 'UK_Component',
      references: {
        model: 'Section',
        key: 'id'
      }
    },
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
    description: {
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
    },
    icon: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      default: 'mdi mdi-duck'
    }
  }, {});
  Component.associate = function (models) {
    // associations can be defined here
  };
  return Component;
};