const users = require('../controllers/user');
const auth = require('../middleware/auth');

module.exports = (app) => {
  // user auth
  app.post('/auth/login', users.login);
  app.get('/auth/default', users.createDefaultUser);
  app.post('/auth/logout', auth, users.logout);
  app.get('/auth/user', auth, users.me);
  // user crud
  app.post('/users', auth, users.create);
  app.get('/users', auth, users.all);
  app.get('/users/:uid', auth, users.user);
  app.delete('/users/:uid', auth, users.delete);
  app.put('/users/:uid', auth, users.update);
  app.post('/users/me/logoutall', auth, users.logoutAll);
};
