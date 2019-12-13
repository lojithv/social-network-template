const user = require('./user.controller');
const express = require('express');
const router = express.Router();
const authorize = require('../app.routes').authorize;

module.exports = router;

//router.get('/signup', user.signup);
//router.get('/login', user.login);
router.post('/auth', user.authenticate);
router.get('/logout', user.logout);
router.get('/dashboard', user.showDashboard);
router.get('/api/users', user.showAll);
router.get('/api/:user', user.show);
router.post('/signup', user.add);
router.post('/:user', user.update);
router.delete('/:user', user.del);

/*authorization middleware
function authorize (req, res, next) {
	if (req.session && req.session.admin) {
		return next();
	} else {
		return res.sendStatus(401);
	}
};
*/