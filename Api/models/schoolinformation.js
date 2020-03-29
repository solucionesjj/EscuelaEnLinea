'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchoolInformation = sequelize.define('SchoolInformation', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    idDirector: DataTypes.INTEGER,
    webPage: DataTypes.STRING,
    approval: DataTypes.STRING,
    pais: DataTypes.STRING,
    departamento: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    urlLogoImage: DataTypes.STRING,
    urlCertificationImage: DataTypes.STRING,
    telephone1: DataTypes.STRING,
    telephone1Description: DataTypes.STRING,
    telephone2: DataTypes.STRING,
    telephone2Description: DataTypes.STRING,
    telephone3: DataTypes.STRING,
    telephone3Description: DataTypes.STRING,
    email1: DataTypes.STRING,
    email1Description: DataTypes.STRING,
    email2: DataTypes.STRING,
    email2Description: DataTypes.STRING,
    email3: DataTypes.STRING,
    email3Description: DataTypes.STRING
  }, {});
  SchoolInformation.associate = function(models) {
    // associations can be defined here
  };
  return SchoolInformation;
};