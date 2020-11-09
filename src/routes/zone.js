const express = require('express');
const zones = require('../controllers/zone');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, zones.all);
router.get('/generate', auth, zones.generate);
router.post('/', auth, zones.store);
router.get('/:id', auth, zones.one);
router.put('/:id', auth, zones.update);
router.delete('/:id', auth, zones.delete);

module.exports.router = router;
