'use strict';
module.exports = (sequelize, DataTypes) => {
  const LegalGuardianQualifyCatalog = sequelize.define('LegalGuardianQualifyCatalog', {
    qualify: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
  }, {freezeTableName: true,});
  LegalGuardianQualifyCatalog.associate = function (models) {
    // associations can be defined here
  };
  return LegalGuardianQualifyCatalog;
};