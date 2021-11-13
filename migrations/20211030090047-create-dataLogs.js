'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DataLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      temperature:{
          type: Sequelize.DECIMAL(7,3),
      },
      ElectronicConductivity:{
          type: Sequelize.STRING,
      },
      GPSLocation:{
          type: Sequelize.STRING,
      },
      pH:{
          type: Sequelize.DECIMAL(4,2),
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DataLogs');
  }
};