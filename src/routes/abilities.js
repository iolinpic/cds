const express = require('express');
const abilities = require('../controllers/ability');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, abilities.all);
router.get('/generate', auth, abilities.generate);
router.post('/', auth, abilities.store);
router.get('/:id', auth, abilities.one);
router.put('/:id', auth, abilities.update);
router.delete('/:id', auth, abilities.delete);

module.exports.router = router;
