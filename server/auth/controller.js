var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;
var logger = require('../util/logger')

exports.signin = function(req, res, next){
  logger.log('Signin route hit');
  // req.user already exists from verifyUser MW
  // Here a token is created and sent back for client to consume
  var token = signToken(req.user._id);
  res.json({token: token});
};
