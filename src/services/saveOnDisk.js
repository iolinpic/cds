const fs = require('fs');
const archiver = require('archiver');
const rimraf = require('rimraf');
const logger = require('../config/logger');

const baseDir = 'jsons';
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

const clear = (targetDir) => {
  if (fs.existsSync(targetDir)) {
    rimraf.sync(targetDir);
  }
};

module.exports.config = (namespace, id, data) => {
  const dir = `${baseDir}/${namespace}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const path = `${dir}/${id}.json`;
  fs.writeFileSync(path, JSON.stringify(data));
};
module.exports.translation = (namespace, data) => {
  const dir = `${baseDir}/${namespace}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const path = `${dir}/${namespace}.csv`;
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, 'Key,SourceString\n');
  }
  fs.appendFileSync(path, `${data.toString()}\n`);
};

function saveToZip(targetDir, outPath, done) {
  // const path = `${dir}/${namespace}.zip`;
  const output = fs.createWriteStream(outPath);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });
  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', () => {
    logger.info(`${archive.pointer()} total bytes`);
    logger.info('archiver has been finalized and the output file descriptor has closed.');
    clear(targetDir);
    return done(outPath);
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', () => {
    logger.info('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      logger.info(err);
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', (err) => {
    logger.error(err);
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  archive.directory(targetDir, false);
  archive.finalize();
}

module.exports.archivate = (namespace, done) => {
  const dir = 'download';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const targetDir = `${baseDir}/${namespace}`;
  if (fs.existsSync(targetDir)) {
    const path = `${dir}/${namespace}.zip`;
    saveToZip(targetDir, path, done);
    // const output = fs.createWriteStream(path);
    // const archive = archiver('zip', {
    //   zlib: { level: 9 }, // Sets the compression level.
    // });
    // // listen for all archive data to be written
    // // 'close' event is fired only when a file descriptor is involved
    // output.on('close', () => {
    //   logger.info(`${archive.pointer()} total bytes`);
    //   logger.info('archiver has been finalized and the output file descriptor has closed.');
    //   clear(targetDir);
    //   return path;
    // });
    //
    // // This event is fired when the data source is drained no matter what was the data source.
    // // It is not part of this library but rather from the NodeJS Stream API.
    // // @see: https://nodejs.org/api/stream.html#stream_event_end
    // output.on('end', () => {
    //   logger.info('Data has been drained');
    // });
    //
    // // good practice to catch warnings (ie stat failures and other non-blocking errors)
    // archive.on('warning', (err) => {
    //   if (err.code === 'ENOENT') {
    //     logger.info(err);
    //   } else {
    //     // throw error
    //     throw err;
    //   }
    // });
    //
    // // good practice to catch this error explicitly
    // archive.on('error', (err) => {
    //   logger.error(err);
    //   throw err;
    // });
    //
    // // pipe archive data to the file
    // archive.pipe(output);
    // archive.directory(targetDir, false);
    // archive.finalize();
  }
};
