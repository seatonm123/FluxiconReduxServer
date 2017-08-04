var config = require('../../config/config');
var Phrase = require('./phraseModel');
var _ = require('lodash');
var logger = require('../../util/logger');


exports.params = function(req, res, next, id) {
  Phrase.findById(id)
    .then(function(phrase) {
      if (!phrase) {
        console.log('Phrase not set');
        next(new Error('That phrase does not exist'));
      } else {
        req.phrase = phrase;
        console.log(req.phrase, '**************************');
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function (req, res, next){
  Phrase.find({})
    .then(function(phrases){
      res.json(phrases);
    }, function(err){
      next(err);
    });
};


// Get by id
exports.getOne = function(req, res, next) {
  var phrase = req.phrase;
  res.json(phrase);
};

exports.put = function(req, res, next){
  var phrase = req.phrase;
  var updatedPhrase = req.body;
  _.merge(phrase, updatedPhrase);
  phrase.save(function(err, savedPhrase){
    if (err) {
      next(err);
    } else {
      res.json(savedPhrase);
    }
  });
};

exports.post = function(req, res, next) {
  var newPhrase = new Phrase(req.body);
  newPhrase.save(function(err){
    if (err) {
      return next(err);
    }
    res.json(newPhrase);
  });
};

exports.delete = function(req, res, next){
  req.phrase.remove(function(err, removed){
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
