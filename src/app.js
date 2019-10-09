const express = require('express');
const expresWinston = require('express-winston');
const logger = require('./config/logger');

const app = express();
// parse requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
require('./routes/user')(app);
// error logger
app.use(expresWinston.errorLogger(logger));
module.exports = app;
