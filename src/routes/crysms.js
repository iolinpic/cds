const express = require('express');
const crysm = require('../controllers/crysm');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, crysm.all);
router.get('/generate', auth, crysm.generate);
router.post('/', auth, crysm.store);
router.get('/:id', auth, crysm.one);
router.put('/:id', auth, crysm.update);
router.delete('/:id', auth, crysm.delete);

module.exports.router = router;
