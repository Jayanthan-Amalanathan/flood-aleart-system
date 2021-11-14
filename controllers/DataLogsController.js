const jwt = require('jsonwebtoken');

const { Devices, DataLogs} = require('../models');
const { makeRes, to, filterErrors } = require('../utils/helpers');
const status = require('../services/status');

/**
 * Add a new device to the system.
 * 
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.user
 * @param {Object} res
 */
const createDataLogs = async (req, res) => {
    console.log('Creating')
    if (typeof req.user === 'undefined' || !req.user) {
        return res.status(500).send(makeRes('Device not found.'));
    }
    console.log('Creating')
    let device = req.user;

    //save data logs
    let saveDataLogs, err;
    [err, savedDataLogs] = await to(DataLogs.create({
        deviceId: device.id,
        waterdepth:req.body.waterdepth,
        raining:req.body.raining,
        waterflow:req.body.waterflow,
        pH:req.body.pH,

    }));


    if (err) {
        console.log(err)
        return res.status(500).send(makeRes('Unable to add new Data Log.', {
            errors: err.errors ? filterErrors(err.errors) : null
        }));
    }

  

  return res.status(200).send(makeRes('Datalog added.'));
}

/**
 * List data logs.
 * 
 * @param {Object} req
 * @param {Object} req.params
 * @param {Object} res 
 */
 const list = async (req, res) => {
    
    let err, dataLogs;
    [err, dataLogs] = await to(DataLogs.findAll({
      include: [
        
        {
          model: Devices,
          as: 'devices',
          attributes: ['uuid'],
        },
      ],
      order: [
        ['updatedAt', 'DESC']
      ]
    }));
  
    if (err) {
      return res.status(500).send(makeRes('Something went wrong.'));
    }
  
    return res.status(200).send(makeRes('Data logs retrieved.', { dataLogs }));
  }

  module.exports={
    createDataLogs,
    list
  }
  