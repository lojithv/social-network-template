const axios = require('axios');

module.exports = {
	index,
	login,
	signup
}

function index(req, res, next) {
	axios.get('http://localhost:3000/api/posts')
	.then(function(posts) {
		res.render('pages/index', {posts: posts.data});
	});
}


function login(req, res, next) {
	res.render('pages/login');
}

function signup(req, res, next) {
	res.render('pages/signup');
}
