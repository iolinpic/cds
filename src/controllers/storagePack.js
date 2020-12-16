const SPack = require('../models/storagePack');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
    try {
        const storagePack = new SPack(req.body);
        await storagePack.save();
        res.status(200).send(storagePack);
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.one = async (req, res) => {
    try {
        const storagePack = await SPack.findById(req.params.id);
        res.status(200).send(storagePack);
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.update = async (req, res) => {
    try {
        const storagePack = await SPack.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
        res.status(200).send(storagePack);
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.all = async (req, res) => {
    try {
        const storagePack = await SPack.find();
        res.status(200).send(storagePack);
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.delete = async (req, res) => {
    try {
        await SPack.findByIdAndRemove(req.params.id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.generate = async (req, res) => {
    try {
        const storagePack = await SPack.find();
        const namespace = 'storagePack';
        storagePack.forEach((el) => {
            const obj = el.toObject();
            const { id, Name } = obj;
            //saveImage(namespace, obj.Icon);
            delete obj.id;
            // eslint-disable-next-line no-underscore-dangle
            delete obj._id;
            delete obj.__v;
            delete obj.Name;
            //delete obj.DescriptionText;
            saveConfig(namespace, id, obj);
            saveCsv(namespace, [obj.DisplayName, Name]);
            //saveCsv(namespace, [obj.Description, DescriptionText]);
        });
        archivate(namespace, (path) => {
            res.download(path);
            // res.status(200).send({ path });
        });
    } catch (e) {
        res.status(400).send(e);
    }
};
