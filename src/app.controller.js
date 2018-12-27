const axios = require('axios');
module.exports = {
	home,
	login,
	signup,
	users
}

function home(req, res, next) {
	axios.get('http://localhost:3000/api/index')
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
	axios.get('http://localhost:3000/api/users')
	.then(function(users) {
		res.render('pages/user-list', {users: users.data});
	})
	.catch(function(error) {
		console.log(error);
	});
}