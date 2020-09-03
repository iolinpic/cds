const fs = require('fs');
const nanoid = require('nanoid');

const defaultDir = 'public/';
const dir = 'static/';

const genrateFileName = (ext) => {
  let name = nanoid.nanoid();
  let newName = `${name}.${ext}`;
  while (fs.existsSync(defaultDir + dir + newName)) {
    name = nanoid.nanoid();
    newName = `${name}.${ext}`;
  }
  return newName;
};
const checkDirExistAndCreate = () => {
  if (!fs.existsSync(defaultDir + dir)) {
    fs.mkdirSync(defaultDir + dir);
  }
};

exports.upload = async (req, res) => {
  try {
    let fstream;
    checkDirExistAndCreate();
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
      const newName = genrateFileName(filename.split('.').pop());
      fstream = fs.createWriteStream(defaultDir + dir + newName);
      file.pipe(fstream);
      fstream.on('close', () => {
        res.status(200).send(JSON.stringify({ path: dir + newName }));
      });
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
