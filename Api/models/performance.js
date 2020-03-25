'use strict';
module.exports = (sequelize, DataTypes) => {
  const Performance = sequelize.define('Performance', {
    performance: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: 'UK_Performances'
    },
    from: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      required: true,
      default: 0
    },
    to: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      default: 0
    }
  }, {});
  Performance.associate = function(models) {
    // associations can be defined here
  };
  return Performance;
};