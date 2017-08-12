var user = require('./user.controller');
var express = require('express');
var router = express.Router();
var authorize = require('../app.routes').authorize;

module.exports = router;

router.get('/signup', user.signup);
router.get('/login', user.login);
router.post('/login', user.authenticate);
router.get('/logout', user.logout);
router.get('/dashboard', authorize, user.showDashboard);
router.get('/users', user.showAll);
router.get('/:user', user.show);
router.post('/signup', user.add);
router.post('/:user', user.update);
router.delete('/:user', user.del);