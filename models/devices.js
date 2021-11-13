'use strict';
const Sequelize = require('sequelize');
const { Model } = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      

     
    }
  };
  Devices.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      validate: {
        
        notEmpty: {
          msg: 'UUID cannot be empty'
        },
       
      }
    },
    statusId: {
        type: DataTypes.INTEGER,
    },
    
    devicejwtToken:{
      type: DataTypes.STRING,  
    }
  }, {
    sequelize,
    modelName: 'Devices',
  });
  return Devices;
};
