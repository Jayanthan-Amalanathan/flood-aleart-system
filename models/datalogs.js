'use strict';
const Sequelize = require('sequelize');
const { Model } = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class DataLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

        DataLogs.belongsTo(models.Devices, {
            foreignKey: 'deviceId',
            as: 'devices'
    
        });

     
    }
  };
  DataLogs.init({
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The deviceId cannot be empty'
        },
        notEmpty: {
          msg: 'The deviceId cannot be empty'
        },
        
      }
    },
    temperature:{
        type: DataTypes.DECIMAL(7,3),
    },
    ElectronicConductivity:{
        type: DataTypes.STRING,
    },
    GPSLocation:{
        type: DataTypes.STRING,
    },
    pH:{
        type: DataTypes.DECIMAL(4,2),
    },

  }, {
    sequelize,
    modelName: 'DataLogs',
  });
  return DataLogs;
};
