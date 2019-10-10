const express = require('express');
const users = require('../controllers/user');
const auth = require('../middleware/auth');

const router = express.Router();
// user auth
router.post('/login', users.login);
router.get('/default', users.createDefaultUser);
router.post('/logout', auth, users.logout);
router.get('/user', auth, users.me);

module.exports.router = router;
