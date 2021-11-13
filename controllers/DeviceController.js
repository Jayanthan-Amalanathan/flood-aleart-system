const jwt = require('jsonwebtoken');

const { Devices} = require('../models');
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
const create = async (req, res) => {
  // Set device status to pending
  const statusId = await status.id('pending');

  // Save device
  let savedDevice, err;
  [err, savedDevice] = await to(Devices.create({
    statusId: statusId,
    uuid:req.body.uuid,
    devicejwtToken:req.body.devicejwtToken,
  }))

  if (err) {
    console.log(err)
    return res.status(500).send(makeRes('Unable to add new device.', {
      errors: err.errors ? filterErrors(err.errors) : null
    }));
  }


  // Generate JWT with device ID
  const secret = process.env.JWT_SECRET_KEY
  const opts = {};

  const token = jwt.sign({ id: savedDevice.id }, secret, opts);

  console.log(savedDevice.id);
  

  return res.status(200).send(makeRes('Device registered.', {
    id: savedDevice.id,
    uuid: savedDevice.uuid,
    token: token
  }));
}

/**
 * Activate a new device
 * 
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.user
 * @param {Object} req.params.deviceId
 * @param {Object} res
 */
 const saveDeviceJWTtoken = async (req, res) => {
    // find Device
    let err, findDevice;
    [err, findDevice] = await to(Devices.findOne({
        where: {
            id: req.params.deviceId,
        }
    }));
    if (err) {
        return res.status(500).send(makeRes('Something went wrong.'));
    }
    
    if (!device) {
        return res.status(400).send(makeRes('Device not found.'));
    }

    [err, findDevice] = await to(findDevice.update({devicejwtToken:req.body.token}));

    if (err) {
        return res.status(500).send(makeRes('Something went wrong.'));
    }

    return res.status(200).send(makeRes('Device token saved.', {
        id: findDevice.id,
        token: findDevice.devicejwtToken
    }));

 }


/**
 * Activate a new device
 * 
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.user
 * @param {Object} req.params
 * @param {Object} res
 */
const activate = async (req, res) => {
  if (typeof req.user === 'undefined' || !req.user) {
    return res.status(400).send(makeRes('User not found.'));
  }

  let user = req.user;

  // Find device from UUID
  let err, device;
  [err, device] = await to(Devices.findOne({
    where: {
      uuid: req.body.uuid
    }
  }));

  if (err) {
    return res.status(500).send(makeRes('Something went wrong.'));
  }

  if (!device) {
    return res.status(400).send(makeRes('Device not found.'));
  }

  // Update device
  const statusActive = await status.id('active');
  
  [err, device] = await to(device.update({
    statusId: statusActive
  }));

  if (err) {
    return res.status(500).send(makeRes('Unable to activate device.', null));
  }

  return res.status(200).send(makeRes('Device activated.', {
    id: device.id
  }));
}

/**
 * List Devices Info.
 * 
 * @param {Object} req
 * @param {Object} req.params
 * @param {Object} req.user
 * @param {number} req.user.id
 * @param {Object} req.params
 * @param {Object} res 
 */
 const listDevices = async (req, res) => {
  

  let DeviceDetails;
  [err, DeviceDetails] = await to(Devices.findAll({
    
    order: [
      ['updatedAt', 'DESC']
    ]
  }));

  if (err) {
   console.log(err)
    return res.status(500).send(makeRes('Something went wrong.'));
  }

  return res.status(200).send(makeRes('Devices Details retrieved.', { DeviceDetails }));
}

 
 /**
 * Delete device Info.
 * 
 * @param {Object} req
 * @param {Object} req.user
 * @param {Object} req.user.id
 * @param {Object} req.params
 * @param {Object} req.params.id
 * @param {Object} res 
 */
 const DeleteDevices = async (req, res) => {
   
  let err, deletedevice;
  [err, deletedevice] = await to(Devices.destroy({
    where: {
      id: req.body.id
    },
  }));

  if (err) {
   console.log(err)
    return res.status(500).send(makeRes('Something went wrong.'));
  }

  if (!deletedevice) {
    return res.status(404).send(makeRes('Factory details not found.'));
  }
 
  return res.status(200).send(makeRes('Factory details deleted.', { deletedevice}));
}


 
module.exports = {
  create,
  activate,
  listDevices,
  DeleteDevices,
  saveDeviceJWTtoken
};
