'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SchoolInformations', [{
      name: 'Nombre institución',
      address: 'Dirección',
      idDirector: 1,
      webPage: 'http://www.pagina.com',
      approval: 'Resolución 1 de 2001',
      country: 'Colombia',
      department: 'Cundinamarca',
      city: 'Bogotá',
      urlLogoImage: 'http://www.pagina.com/logo.jpg',
      urlCertificationImage: 'http://www.pagina.com/logocalidad.jpg',
      telephone1: '',
      telephone1Description: '',
      telephone2: '',
      telephone2Description: '',
      telephone3: '',
      telephone3Description: '',
      email1: '',
      email1Description: '',
      email2: '',
      email2Description: '',
      email3: '',
      email3Description: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SchoolInformations', { }, { restartIdentity: true, truncate:true });
  }
};
