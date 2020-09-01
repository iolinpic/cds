const express = require('express');
const file = require('../controllers/file');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/upload', auth, file.upload);

module.exports.router = router;
