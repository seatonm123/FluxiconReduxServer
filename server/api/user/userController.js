var config = require('../../config/config');
var User = require('./userModel');
var _ = require('lodash');
var logger = require('../../util/logger');


exports.params = function(req, res, next, id) {
    User.findById(id)
      .select('-password')
      .select('-admin')
      .exec()
      .then(function(user) {
        if (!user) {
          console.log('User not set');
          next(new Error('That user does not exist'));
        } else {
          req.user = user;
          console.log(req.user, '**************************');
          next();
        }
      }, function(err) {
        next(err);
      });
  };

  exports.get = function (req, res, next){
    User.find({})
      .select('-password')
      .select('-admin')
      .exec()
      .then(function(users){
        res.json(users);
      }, function(err){
        next(err);
      });
  };


// Get by id
exports.getOne = function(req, res, next) {
  var user = req.user;
  res.json(user);
};

exports.put = function(req, res, next){
  var user = req.user;
  var updatedUser = req.body;
  _.merge(user, updatedUser);
  user.save(function(err, savedUser){
    if (err) {
      next(err);
    } else {
      res.json(savedUser);
    }
  });
};

exports.post = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.save(function(err){
    if (err) {
      return next(err);
    }
    // Create Jwt and send back to be saved by client
    // var token = signToken(user._id);
    // res.json({token: token});
    res.json(newUser);
  });
};

exports.delete = function(req, res, next){
  req.user.remove(function(err, removed){
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

// 'me' route that returns the current user set by params
exports.me = function(req, res){
  res.json(req.user.toJson());
};
