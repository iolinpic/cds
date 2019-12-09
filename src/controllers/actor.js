const Actor = require('../models/actors');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.status(200).send(actor);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    res.status(200).send(actor);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
    res.status(200).send(actor);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).send(actors);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await Actor.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.generate = async (req, res) => {
  try {
    const actors = await Actor.find();
    actors.forEach((el) => {
      const obj = el.toObject();
      const { id, DisplayNameText, DescriptionText } = obj;
      delete obj.id;
      // eslint-disable-next-line no-underscore-dangle
      delete obj._id;
      delete obj.__v;
      delete obj.DisplayNameText;
      delete obj.DescriptionText;
      saveConfig('actors', id, obj);
      saveCsv('actors', [obj.DisplayName, DisplayNameText]);
      saveCsv('actors', [obj.Description, DescriptionText]);
    });
    archivate('actors', (path) => {
      res.download(path);
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
