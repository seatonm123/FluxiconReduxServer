var User = require('../api/user/userModel');
var Phrase = require('../api/phrase/phraseModel');

var users = [{
  username: 'admin',
  password: 'frigates299',
  name: 'Administrator',
  email: 'matt.r.seaton@gmail.com',
  profilePicture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjLAAAAJDJkM2M1ZGFkLTJjMTItNDFlOC1hMGNmLWQ5ODc0N2Q1YjU0Zg.jpg',
  inventory: ['keysToTheKingdom'],
  achievements: []
}];
var phrases = require('./seedFiles/phrase.js');

function runSeeds(modl, arr){
  modl.remove({}, function(err){
    if (err) {
      console.log(err);
      return err;
    }
    modl.create(arr,
      function(err){
        if (err){
          console.log(err);
        }
      });
  });
}

runSeeds(User, users);
runSeeds(Phrase, phrases);
