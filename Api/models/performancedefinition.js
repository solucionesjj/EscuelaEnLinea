'use strict';
module.exports = (sequelize, DataTypes) => {
  const performanceDefinition = sequelize.define('performanceDefinition', {
    idAcademicLoad: {
      allowNull: false,
      required: true,
      type: DataTypes.INTEGER,
      unique: 'PK_performanceDefinition',
      references: {
        model: 'AcademicLoads',
        key: 'id'
      }
    },
    idPerformance: {
      allowNull: false,
      required: true,
      type: DataTypes.INTEGER,
      unique: 'PK_performanceDefinition',
      references: {
        model: 'Performances',
        key: 'id'
      }
    },
    period: {
      allowNull: false,
      required: true,
      type: DataTypes.INTEGER,
      unique: 'PK_performanceDefinition'
    },
    description: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING,
      default: 'Sin definir.'
    }
  }, {});
  performanceDefinition.associate = function(models) {
    // associations can be defined here
  };
  return performanceDefinition;
};