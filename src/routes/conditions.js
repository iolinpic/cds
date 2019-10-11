const express = require('express');
const conditions = require('../controllers/condition');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, conditions.all);
router.post('/', auth, conditions.store);
router.get('/:id', auth, conditions.one);
router.put('/:id', auth, conditions.update);
router.delete('/:id', auth, conditions.delete);

module.exports.router = router;
