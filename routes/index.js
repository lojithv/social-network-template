exports.user = require('./user');
var User = require('../models/user');
exports.index = function(req, res, next){
	User.find(function (error, users) {
    if (error) return next(error);
    res.render('index', {user: req.session.user, users: users})
  });
    //res.render('index', {user: req.session.user});
};




