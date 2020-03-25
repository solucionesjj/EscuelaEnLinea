'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    section: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      unique: 'PK_Section'
    },
    order: {
      type: DataTypes.INTEGER,
      required: true,
      allowNulls: false,
    },
    icon: {
      type: DataTypes.STRING,
      required: true,
      allowNulls: false,
      default: 'mdi mdi-duck'
    }
  }, {});
  Section.associate = function(models) {
    // associations can be defined here
  };
  return Section;
};