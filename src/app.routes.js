const express = require('express');
const router = express.Router();
const app = require('./app.controller');

module.exports = router;


router.get('/', app.home);
//router.get('/login', app.login);
//router.get('/signup', app.signup);
//router.get('/users', app.users)


