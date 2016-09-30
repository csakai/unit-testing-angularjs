var router = require('express').Router();

router.use('/items', require('./api/items'));

module.exports = router;

