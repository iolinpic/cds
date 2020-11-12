const express = require('express');
const dialog = require('../controllers/dialogs');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, dialog.all);
router.get('/generate', auth, dialog.generate);
router.post('/', auth, dialog.store);
router.get('/:id', auth, dialog.one);
router.put('/:id', auth, dialog.update);
router.delete('/:id', auth, dialog.delete);

module.exports.router = router;
