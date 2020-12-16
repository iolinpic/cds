const express = require('express');
const storagePack = require('../controllers/storagePack');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, storagePack.all);
router.get('/generate', auth, storagePack.generate);
router.post('/', auth, storagePack.store);
router.get('/:id', auth, storagePack.one);
router.put('/:id', auth, storagePack.update);
router.delete('/:id', auth, storagePack.delete);

module.exports.router = router;
