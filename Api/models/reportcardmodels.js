'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportCardModels = sequelize.define('ReportCardModels', {
    name: {
      type: DataTypes.STRING,
      unique: 'UK_ReportCardModels',
      allowNull: false,
      required: true
    } ,
    header: DataTypes.TEXT,
    body: DataTypes.TEXT,
    footer: DataTypes.TEXT
  }, {});
  ReportCardModels.associate = function(models) {
    // associations can be defined here
  };
  return ReportCardModels;
};