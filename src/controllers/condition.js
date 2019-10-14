const Condition = require('../models/conditions');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const archivate = require('../services/saveOnDisk').archivate;

exports.store = async (req, res) => {
  try {
    const condition = new Condition(req.body);
    await condition.save();
    res.status(200).send(condition);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const condition = await Condition.findById(req.params.id);
    res.status(200).send(condition);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    const condition = await Condition.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
    // user.name = req.body.name;
    // user.email = req.body.email;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }
    // await condition.save();
    res.status(200).send(condition);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const conditions = await Condition.find();
    res.status(200).send(conditions);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await Condition.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.generate = async (req, res) => {
  try {
    const conditions = await Condition.find();
    conditions.forEach((el) => {
      const obj = el.toObject();
      const { id, DisplayNameText, DescriptionText } = obj;
      delete obj.id;
      // eslint-disable-next-line no-underscore-dangle
      delete obj._id;
      delete obj.__v;
      delete obj.DisplayNameText;
      delete obj.DescriptionText;
      saveConfig('conditions', id, obj);
      saveCsv('conditions', [obj.DisplayName, DisplayNameText]);
      saveCsv('conditions', [obj.Description, DescriptionText]);
    });
    archivate('conditions', (path) => {
      res.download(path);
      // res.status(200).send({ path });
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
