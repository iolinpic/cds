const express = require('express');
const expresWinston = require('express-winston');
const mongoose = require('mongoose');
const logger = require('./config/logger');

mongoose.Promise = global.Promise;

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

app.listen(process.env.PORT, async () => {
  logger.info(`Server is listening on port ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    logger.debug('Successfully connected to the database');
  } catch (err) {
    logger.error('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
});
