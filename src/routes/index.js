const express = require('express');

const router = express.Router();
// user auth
router.use('/users', require('./user').router);
router.use('/auth', require('./auth').router);
router.use('/conditions', require('./conditions').router);
router.use('/abilities', require('./abilities').router);

module.exports.router = router;
