const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  if (req.header('Authorization')) {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
      const data = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findOne({ _id: data.id, 'tokens.token': token });
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status(401).send({ error: 'Not authorized to access this resource' });
      }
    } catch (error) {
      res.status(401).send({ error: 'Wrong auth token' });
    }
  } else {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};
module.exports = auth;
