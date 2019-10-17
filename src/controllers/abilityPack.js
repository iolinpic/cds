const AbilityPack = require('../models/abilityPack');
const saveConfig = require('../services/saveOnDisk').config;
// const saveCsv = require('../services/saveOnDisk').translation;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
  try {
    const pack = new AbilityPack(req.body);
    await pack.save();
    res.status(200).send(pack);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const pack = await AbilityPack.findById(req.params.id);
    res.status(200).send(pack);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    const pack = await AbilityPack.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
    res.status(200).send(pack);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const abilities = await AbilityPack.find();
    res.status(200).send(abilities);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await AbilityPack.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.generate = async (req, res) => {
  try {
    const abilities = await AbilityPack.find();
    const namespace = 'abilities';
    abilities.forEach((el) => {
      const obj = el.toObject();
      const { id } = obj;
      delete obj.id;
      delete obj._id;
      delete obj.__v;
      // delete obj.DisplayNameText;
      // delete obj.DescriptionText;
      saveConfig(namespace, id, obj);
      // saveCsv(namespace, [obj.DisplayName, DisplayNameText]);
      // saveCsv(namespace, [obj.Description, DescriptionText]);
    });
    archivate(namespace, (path) => {
      res.download(path);
      // res.status(200).send({ path });
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
