const mongoose = require('mongoose');
const fs = require('fs');
const util = require('util');
const logger = require('./config/logger');
const app = require('./app');

mongoose.Promise = global.Promise;


app.listen(process.env.PORT, async () => {
  logger.info(`Server is listening on port ${process.env.PORT}`);
  try {
    if (process.env.DEBUG === 'true') {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useCreateIndex: true,
      });
    } else {
      const url = util.format(
        'mongodb://%s:%s@%s/%s?replicaSet=%s&authSource=%s&ssl=true',
        process.env.MONGO_USER,
        process.env.MONGO_PASSWORD,
        [
          process.env.MONGO_URL,
        ].join(','),
        process.env.MONGO_DB,
        'rs01',
        process.env.MONGO_DB,
      );

      const options = {
        useNewUrlParser: true,
        replSet: {
          sslCA: fs.readFileSync(process.env.MONGO_CERT),
        },
      };
      await mongoose.connect(url, options);
    }
    logger.debug('Successfully connected to the database');
  } catch (err) {
    logger.error('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
});
