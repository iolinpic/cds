const express = require('express');
const items = require('../controllers/item');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, items.all);
router.get('/generate', auth, items.generate);
router.post('/', auth, items.store);
router.get('/:id', auth, items.one);
router.put('/:id', auth, items.update);
router.delete('/:id', auth, items.delete);

module.exports.router = router;
