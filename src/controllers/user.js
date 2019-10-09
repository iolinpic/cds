const User = require('../models/user');

exports.createDefaultUser = async (req, res) => {
  try {
    const user = new User({ name: 'admin', email: 'admin@neksys.ru', password: '12345678' });
    await user.save();
    await user.generateAuthToken();
    res.status(201);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.update = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.uid });
    // const data = JSON.parse(req.body);
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.all = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.uid);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.user = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
// auth
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.me = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
