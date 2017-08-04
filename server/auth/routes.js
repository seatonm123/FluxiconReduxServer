var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./controller');

// No JWT sent until username and password are matched with DB
// Promise chain that outputs result
router.post('/signin', verifyUser(), controller.signin);

module.exports = router;
