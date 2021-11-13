const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');

const { to } = require('../utils/helpers');
const {Devices} = require('../models');



const deviceOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.JWT_SECRET_KEY
  };
  
  const deviceStrategy = new Strategy(deviceOpts, async (jwt_payload, done) => {
    console.log(deviceOpts);
    let err, executive;
    [err, executive] = await to(Devices.findOne({
      where: {
        id: jwt_payload.id,
        statusId: 1
      }
    }));
  
    if (err) {
      return done(null, false);
    }
  
    return done(null, executive);
  });





module.exports = {
  deviceStrategy
};