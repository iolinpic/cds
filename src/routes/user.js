module.exports = (app) => {
    const users = require('../controllers/user');
    const auth = require('../middleware/auth');

    app.post('/auth/login', users.login);
    app.post('/auth/logout', auth, users.logout);
    app.post('/users', users.create);
    app.get('/users',auth ,users.all);
    app.delete('/users/:uid',auth ,users.delete);
    app.get('/users/me', auth, users.me);
    app.post('/users/me/logoutall', auth, users.logoutAll);
};