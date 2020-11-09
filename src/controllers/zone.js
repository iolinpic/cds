const Zone = require('../models/zone');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
  try {
    const zone = new Zone(req.body);
    await zone.save();
    res.status(200).send(zone);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    res.status(200).send(zone);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
    res.status(200).send(zone);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.status(200).send(zones);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await Zone.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
 exports.generate = async (req, res) => {
   try {
     const zones = await Zone.find();
     zones.forEach((el) => {
       const obj = el.toObject();
       const { id, TitleText, AutoText } = obj;
       delete obj.id;
       // eslint-disable-next-line no-underscore-dangle
       delete obj._id;
       delete obj.__v;
       delete obj.TitleText;
       delete obj.AutoText;
       saveConfig('zones', id, obj);
       saveCsv('zones', [obj.Title, TitleText]);
       saveCsv('zones', [obj.Auto, AutoText]);
     });
     archivate('zones', (path) => {
       res.download(path);
     });
   } catch (e) {
     res.status(400).send(e);
   }
 };
