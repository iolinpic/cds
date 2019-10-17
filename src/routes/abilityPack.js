const express = require('express');
const pack = require('../controllers/abilityPack');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, pack.all);
router.get('/generate', auth, pack.generate);
router.post('/', auth, pack.store);
router.get('/:id', auth, pack.one);
router.put('/:id', auth, pack.update);
router.delete('/:id', auth, pack.delete);

module.exports.router = router;
