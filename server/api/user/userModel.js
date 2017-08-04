var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: String,
  admin: {
    type: Boolean,
    default: false
  },
  gameLevel: {
    type: Number,
    default: 1
  },
  gameXp: {
    type: Number,
    default: 0
  },
  trainingLevel: {
    type: Number,
    default: 1
  },
  trainingXp: {
    type: Number,
    default: 0
  },
  inventory: [String],
  achievements: [String]
});

module.exports = mongoose.model('user', UserSchema);
