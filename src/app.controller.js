const axios = require('axios');
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

module.exports = {
	home,
	login,
	signup,
	users
}

function home(req, res, next) {
	axios.get(host + ':' + port + '/api/index')
	.then(function(posts) {
		res.render('pages/index');
	})
	.catch(function(error) {
		console.log(error);
	});
}

function login(req, res, next) {
	res.render('pages/login');
}

function signup(req, res, next) {
	res.render('pages/signup');
}

function users(req, res, next) {
	axios.get(host + ':' + port + '/api/users')
	.then(function(users) {
		res.render('pages/user-list', {users: users.data});
	})
	.catch(function(error) {
		console.log(error);
	});
}