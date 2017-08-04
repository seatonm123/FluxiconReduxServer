var config = require('../../config/config');
var Game = require('./gameModel');
var _ = require('lodash');
var logger = require('../../util/logger');


exports.params = function(req, res, next, id) {
  Game.findById(id)
    .populate('phrases')
    .exec()
    .then(function(game) {
      if (!game) {
        console.log('Game not set');
        next(new Error('That game does not exist'));
      } else {
        req.game = game;
        console.log(req.game, '**************************');
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function (req, res, next){
  Game.find({})
    .populate('phrases')
    .exec()
    .then(function(games){
      res.json(games);
    }, function(err){
      next(err);
    });
};

// Get by id
exports.getOne = function(req, res, next) {
  var game = req.game;
  res.json(game);
};

exports.put = function(req, res, next){
  var game = req.game;
  var updatedGame = req.body;
  _.merge(game, updatedGame);
  game.save(function(err, savedGame){
    if (err) {
      next(err);
    } else {
      res.json(savedGame);
    }
  });
};

exports.post = function(req, res, next) {
  var newGame = new Game(req.body);
  newGame.save(function(err){
    if (err) {
      return next(err);
    }
    res.json(newGame);
  });
};

exports.delete = function(req, res, next){
  req.game.remove(function(err, removed){
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

exports.me = function(req, res){
  res.json(req.game.toJson());
};
