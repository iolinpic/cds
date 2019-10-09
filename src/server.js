const mongoose = require('mongoose');
const logger = require('./config/logger');
const app = require('./app');

mongoose.Promise = global.Promise;

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
