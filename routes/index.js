const router = require('express').Router();
const passport = require('passport');
const multer = require('multer');

const jwtStrategy = require("../services/jwtStrategy");

// JWT Strategies for Application
passport.use('jwt-device', jwtStrategy.deviceStrategy);

module.exports = router;


// Assign controller methods
const DeviceController = require('../controllers/DeviceController');
const DataLogsController = require('../controllers/DataLogsController');


//DeviceController
router.post('/device/create',DeviceController.create);
router.post('/device/:deviceId/updateToken',DeviceController.create);
router.post('/device/activate', DeviceController.activate);
router.get('/device/getall/pending', DeviceController.listDevices);
router.post('/device/delete',DeviceController.DeleteDevices);

//Data logs

router.post(
	"/datalog/createLogs",
	passport.authenticate("jwt-device", { session: false }),
	DataLogsController.createDataLogs
);
router.get('/datalog/getall', passport.authenticate("jwt-device", { session: false }),DataLogsController.list);

module.exports = router;