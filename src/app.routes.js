const express = require('express');
const router = express.Router();
const app = require('./app.controller');

module.exports = router;


router.get('/', app.index);
router.get('/login', app.login);
router.get('/signup', app.signup);



/*authorization middleware
function authorize (req, res, next) {
	if (req.session && req.session.admin) {
		return next();
	} else {
		return res.sendStatus(401);
	}
};
*/