var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhraseSchema = new Schema({
  category: String,
  difficulty: Number,
  content: String,
  author: String,
  points: Number
});

module.exports = mongoose.model('phrase', PhraseSchema);
