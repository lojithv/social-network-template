let Post = require('./post.model');

module.exports = {
	index,
	getPosts,
	updateAll,
	deleteAll,
	create,
	getPost,
	update,
	del
}

function index(req, res, next){
	Post.find({}, null, {limit: 6, sort: {created_at: -1}}, function (error, posts) {
    if (error) return res.send(error.message);
    res.json(posts);
  });
};

function getPosts(req, res, next) {
	Post.find(function (err, posts) {
		if (err) return res.send(err);
		res.json(posts);
	});
}

function updateAll(req, res, next) {
	res.send('update all');
}

function deleteAll(req, res, next) {
	res.send('delete all');
}

function create(req, res, next) {
	var post = new Post({
		text: req.body.text,
		author: {
			username: req.body.author
		}
	});

	post.save(function (err, post) {
		if (err) return res.send(err.message);
		//res.json(post);
		res.redirect('/');
	});
}

function getPost(req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return res.send(err);
		res.json(post);
	});
}

function update(req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return res.send(err);
		post.text = req.body.text;

		post.save(function (err, post) {
			if (err) res.send(err);
			res.json(post);
		});
	});
}

function del(req, res, next) {
	Post.findByIdAndRemove(req.params.id, function (err, post) {
		if (err) res.send(err);
		res.json({message: "removed"});
	});
}