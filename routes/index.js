var User = require('../models/user');
var Post = require('../models/post');
var express = require('express');
var router = express.Router();
var user = require('./user');
var post = require('./post');

var index = function(req, res, next){
	Post.find({}, null, {sort: {created_at: -1}}, function (error, posts) {
    if (error) return next(error);
    res.render('index', {user: req.session.user, posts: posts})
  });
};


//authorization middleware
var authorize = function (req, res, next) {
	if (req.session && req.session.admin) {
		return next();
	} else {
		return res.sendStatus(401);
	}
};

router.get('/', index);
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

router.all('/api/*', authorize);
router.get('/api/posts', post.getPosts);
router.put('/api/posts', post.updateAll);
router.delete('/api/posts', post.deleteAll)
router.post('/api/posts', post.create);
router.get('/api/posts/:id', post.getPost)
router.put('/api/posts/:id', post.update);
router.delete('/api/posts/:id', post.del);

router.all('*', function (req, res) {
	res.sendStatus(404);
});

module.exports = router;
