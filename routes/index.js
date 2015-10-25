var User = require('../models/user');
var Post = require('../models/post');

exports.index = function(req, res, next){
	Post.find({}, null, {sort: {created_at: -1}}, function (error, posts) {
    if (error) return next(error);
    res.render('index', {user: req.session.user, posts: posts})
  });
};

exports.user = require('./user');

exports.post = require('./post');