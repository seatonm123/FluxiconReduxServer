var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  timestamp: Date,
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  type: String,
  playerScores: [Number],
  language: String,
  category: String,
  difficulty: Number,
  pointsToWin: Number,
  xpForWin: Number,
  phrases: [{
    type: Schema.Types.ObjectId,
    ref: 'phrase'
  }],
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('game', GameSchema);
