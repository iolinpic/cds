const express = require('express');

const router = express.Router();
// user auth
router.use('/users', require('./user').router);
router.use('/auth', require('./auth').router);
router.use('/conditions', require('./conditions').router);
router.use('/abilities', require('./abilities').router);
router.use('/pack', require('./abilityPack').router);
router.use('/crysm', require('./crysms').router);
router.use('/item', require('./items').router);
router.use('/actor', require('./actor').router);
router.use('/zone', require('./zone').router);
router.use('/quest', require('./quests').router);
router.use('/file', require('./files').router);

module.exports.router = router;
