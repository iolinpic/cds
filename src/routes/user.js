const express = require('express');
const users = require('../controllers/user');
const auth = require('../middleware/auth');

const router = express.Router();
// user crud
router.post('/', auth, users.create);
router.get('/', auth, users.all);
router.get('/:uid', auth, users.user);
router.delete('/:uid', auth, users.delete);
router.put('/:uid', auth, users.update);
router.post('/me/logoutall', auth, users.logoutAll);

module.exports.router = router;
