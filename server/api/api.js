var router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/games', require('./game/gameRoutes'));
router.use('/phrases', require('./phrase/phraseRoutes'));

module.exports = router;
