'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  Promise.all([
      queryInterface.addColumn('Users', 'googleId', Sequelize.STRING, {
        allowNull: false,
        required: true
      }),

      queryInterface.addColumn('Users', 'surname', Sequelize.STRING, {
      }),

      queryInterface.addColumn('Users', 'birthday', Sequelize.DATEONLY, {
      }),

      queryInterface.addColumn('Users', 'identificationDocument', Sequelize.STRING, {
        allowNull: false,
        required: true
      }),

      queryInterface.addColumn('Users', 'identificationDocumentType', Sequelize.STRING, {
        allowNull: false,
        required: true
      }),

      queryInterface.addColumn('Users', 'identificationDocumentExpeditionSite', Sequelize.STRING, {
        allowNull: false,
        required: true
      }),      

      queryInterface.addColumn('Users', 'nationality', Sequelize.STRING, {
      }),

      queryInterface.addColumn('Users', 'gender', Sequelize.STRING, {
      }),

      queryInterface.changeColumn('Users', 'email', Sequelize.STRING, {
        allowNull: false,
        required: true
      }),

      queryInterface.changeColumn('Users', 'password', Sequelize.STRING, {
        allowNull: false,
        required: true
      }),

      queryInterface.changeColumn('Users', 'password', Sequelize.STRING, {
        allowNull: false,
        required: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'googleId'),
      queryInterface.removeColumn('Users', 'surname'),
      queryInterface.removeColumn('Users', 'birthday'),
      queryInterface.removeColumn('Users', 'identificationDocument'),
      queryInterface.removeColumn('Users', 'identificationDocumentType'),
      queryInterface.removeColumn('Users', 'identificationDocumentExpeditionSite'),
      queryInterface.removeColumn('Users', 'nationality'),
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.changeColumn('Users', 'email', Sequelize.STRING, {
      }),
      queryInterface.changeColumn('Users', 'password', Sequelize.STRING, {
      }),
      queryInterface.changeColumn('Users', 'active', Sequelize.SMALLINT, {
      })
    ]);
  }
};
