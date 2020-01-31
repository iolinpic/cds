const express = require('express');
const quests = require('../controllers/quest');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, quests.all);
router.get('/generate', auth, quests.generate);
router.post('/', auth, quests.store);
router.get('/:id', auth, quests.one);
router.put('/:id', auth, quests.update);
router.delete('/:id', auth, quests.delete);

module.exports.router = router;
