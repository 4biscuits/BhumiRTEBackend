/*
 * Passport middleware to authenticate users based on jwt token
*/

var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var config = require('../config/database');
var passport = require('passport');

module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload,done){
    User.findOne({id:jwt_payload.id},function(err,user){
        if (err){
          return done(err,false);
        }
        if (user){
          done(null,user);
        }else{
          done(null,false);
        }
    });
  }))
};