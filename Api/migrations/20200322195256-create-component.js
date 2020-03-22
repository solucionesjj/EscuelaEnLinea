'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSection: {
        type: Sequelize.INTEGER,
        required: true,
        allowNulls: false,
        unique: 'UK_Component',
        references: {
          model: 'Sections',
          key: 'id'
        }
      },
      component: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        unique: 'UK_Component'
      },
      action: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        unique: 'UK_Component'
      },
      description: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        default: ''
      },
      showInMenu: {
        type: Sequelize.BOOLEAN,
        required: true,
        allowNulls: false,
        default: false
      },
      menuTitle: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        default: ''
      },
      routerLink: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        default: ''
      },
      menuOrder: {
        type: Sequelize.INTEGER,
        default: 0
      },
      icon: {
        type: Sequelize.STRING,
        required: true,
        allowNulls: false,
        default: 'mdi mdi-duck'
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
    return queryInterface.dropTable('Components');
  }
};