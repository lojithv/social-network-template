var User = require('../models/user');

exports.signup = function (req, res, next) {
  res.render('signup');
}

exports.login = function(req, res, next) {
  res.render('login');
};

exports.logout = function(req, res, next) {
  //clear the session
  req.session.destroy();
  res.redirect('/');
};

exports.add = function (req, res, next) {
  if(!req.body.username || !req.body.email || !req.body.password) {
    return res.render('signup', {error: 'Fill name, email, and password'});
 }
 //TODO: check if user is in database, send cofirmation email 
 var user = new User();
 user.username = req.body.username;
 user.email = req.body.email;
 user.password = req.body.password;
  
  // Check for duplicate username
  User.count({username: user.username}, function (error, count) {
      if (count > 0) return res.render('signup', {error: 'Username already exists'});
  });

  user.save(function (error, user) {
    if (error) return res.render('signup', {error: error});
    req.session.user = user;
    req.session.admin = user.admin
    res.redirect('/dashboard');
  });
}

exports.update = function (req, res, next) {
  //console.log('req.body.email', req.body.email);
  User.findOne({username: req.session.user.username}, function (error, user) {
    if (error) return res.render('error', {error: 'oops! something went wrong'});
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    
    user.save(function(error) {
      if (error) return res.send(error);
      res.redirect('/dashboard');
    });
  });
}

exports.del = function (req, res, next) {
  if (!req.params.user) return next(new Error('No user ID.'));
  User.remove({username: req.params.user}, function (error, user) {
    if(!user) return next(new Error('user not found'));
    if (error) return next(error);
    req.session.destroy();
  });
}

exports.show = function (req, res, next) {
  if (!req.params.user) return res.render('error', {error: 'page not found'});
  User.findOne({username: req.params.user}, function (error, profile) {
    if (error) return res.render('error', {error: error});
    res.render('profile', {user: req.session.user, profile: profile});
  });
}

exports.showAll = function (req, res, next) {
  User.find({}, function (error, users) {
    if (error) return next(error);
    res.render('userlist', {user: req.session.user, users: users})
  });
}

exports.authenticate = function(req, res, next) {
  if (!req.body.email || !req.body.password) {
  	return res.render('login', {error: 'Please enter your email and password.'});
  }
  User.findOne({
  	email: req.body.email,
  	password: req.body.password
  }, function (error, user) {
  	if (error) return next(error);
  	if (!user) return res.render('login', {error: 'Incorrect email and password combination'});
  	req.session.user = user;
  	req.session.admin = user.admin
  	res.redirect('/dashboard');
  });

};

exports.showDashboard = function(req, res, next) {
	User.findOne({email:req.session.user.email}, function(error, user) {
    	if (error) return next(error);
    	res.render('dashboard', {user: user});
    	//res.send({user:req.session.user.name});
  });
}
