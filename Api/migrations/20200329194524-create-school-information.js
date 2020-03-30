'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SchoolInformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      idDirector: {
        type: Sequelize.INTEGER
      },
      webPage: {
        type: Sequelize.STRING
      },
      approval: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      urlLogoImage: {
        type: Sequelize.STRING
      },
      urlCertificationImage: {
        type: Sequelize.STRING
      },
      telephone1: {
        type: Sequelize.STRING
      },
      telephone1Description: {
        type: Sequelize.STRING
      },
      telephone2: {
        type: Sequelize.STRING
      },
      telephone2Description: {
        type: Sequelize.STRING
      },
      telephone3: {
        type: Sequelize.STRING
      },
      telephone3Description: {
        type: Sequelize.STRING
      },
      email1: {
        type: Sequelize.STRING
      },
      email1Description: {
        type: Sequelize.STRING
      },
      email2: {
        type: Sequelize.STRING
      },
      email2Description: {
        type: Sequelize.STRING
      },
      email3: {
        type: Sequelize.STRING
      },
      email3Description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SchoolInformations');
  }
};