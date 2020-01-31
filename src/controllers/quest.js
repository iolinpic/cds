const Quest = require('../models/quests');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
  try {
    const quest = new Quest(req.body);
    await quest.save();
    res.status(200).send(quest);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    res.status(200).send(quest);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
    res.status(200).send(quest);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.status(200).send(quests);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await Quest.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.generate = async (req, res) => {
  try {
    const quests = await Quest.find();
    const namespace = 'quests';
    quests.forEach((el) => {
      const obj = el.toObject();
      const { id, DisplayNameText, DescriptionText } = obj;
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
