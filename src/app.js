const express = require('express');
const expresWinston = require('express-winston');
const busboy = require('connect-busboy');
const logger = require('./config/logger');
const path = require('path');

const app = express();
// parse requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(busboy());
app.use(express.static('public'));
// Enable CORS for all HTTP methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// route logger
app.use(expresWinston.logger(logger));
// default route
app.use('/api', require('./routes').router);
// error logger
app.use(expresWinston.errorLogger(logger));
module.exports = app;
