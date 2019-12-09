const express = require('express');
const actors = require('../controllers/actor');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, actors.all);
router.get('/generate', auth, actors.generate);
router.post('/', auth, actors.store);
router.get('/:id', auth, actors.one);
router.put('/:id', auth, actors.update);
router.delete('/:id', auth, actors.delete);

module.exports.router = router;
