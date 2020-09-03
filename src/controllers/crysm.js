const Crysm = require('../models/crysm');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const saveImage = require('../services/saveOnDisk').images;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
  try {
    const crysm = new Crysm(req.body);
    await crysm.save();
    res.status(200).send(crysm);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const crysm = await Crysm.findById(req.params.id);
    res.status(200).send(crysm);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    const crysm = await Crysm.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
    res.status(200).send(crysm);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const crysms = await Crysm.find();
    res.status(200).send(crysms);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await Crysm.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.generate = async (req, res) => {
  try {
    const crysms = await Crysm.find();
    const namespace = 'crysms';
    crysms.forEach((el) => {
      const obj = el.toObject();
      const { id, DisplayNameText, DescriptionText } = obj;
      saveImage(namespace, obj.IconBig);
      saveImage(namespace, obj.IconSmall);
      delete obj.id;
      // eslint-disable-next-line no-underscore-dangle
      delete obj._id;
      delete obj.__v;
      delete obj.DisplayNameText;
      delete obj.DescriptionText;
      saveConfig(namespace, id, obj);
      saveCsv(namespace, [obj.DisplayName, DisplayNameText]);
      saveCsv(namespace, [obj.Description, DescriptionText]);
    });
    archivate(namespace, (path) => {
      res.download(path);
      // res.status(200).send({ path });
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
