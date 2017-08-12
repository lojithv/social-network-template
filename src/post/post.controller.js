var Post = require('./post.model');

//HOME PAGE
exports.index = function(req, res, next){
	Post.find({}, null, {sort: {created_at: -1}}, function (error, posts) {
    if (error) return next(error);
    res.render('index', {user: req.session.user, posts: posts})
  });
};

//GET ALL POSTS
exports.getPosts = function (req, res, next) {
	Post.find(function (err, posts) {
		if (err) return res.send(err);
		res.json(posts);
	});
}

//UPDATE ALL POSTS
exports.updateAll = function (req, res, next) {
	res.send('update all');
}

//DELETE ALL POSTS
exports.deleteAll = function (req, res, next) {
	res.send('delete all');
}

//CREATE POST 
exports.create = function (req, res, next) {
	var post = new Post({
		text: req.body.text,
		author: req.session.user
	});

	post.save(function (err, post) {
		if (err) return res.send(err);
		res.json(post);
		//res.redirect('/dashboard');
	});
}

//GET POST
exports.getPost = function (req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return res.send(err);
		res.json(post);
	});
}

//UPDATE POST
exports.update = function (req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return res.send(err);
		post.text = req.body.text;

		post.save(function (err, post) {
			if (err) res.send(err);
			res.json(post);
		});
	});
}

//DELETE POST
exports.del = function (req, res, next) {
	Post.findByIdAndRemove(req.params.id, function (err, post) {
		if (err) res.send(err);
		res.json({message: "removed"});
	});
}