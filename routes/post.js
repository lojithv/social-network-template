exports.list = function (req, res, next) {
	res.send('list all');
}

exports.add = function (req, res, next) {
	res.send('created new post');
}

exports.edit = function (req ,res, next) {
	res.send('updated post');
}

exports.del = function (req, res, next) {
	res.send('deleted post');
}