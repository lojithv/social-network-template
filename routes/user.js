exports.add = function (req, res, next) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    return res.render('signup', {error: 'Fill name, email, and password'});
 }
 //TODO: check if user is in database, send cofirmation email 

  var user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  req.models.User.create(user, function (error, user) {
    if (error) return next(error);
    req.session.user = user;
    req.session.admin = user.admin
    res.redirect('/dashboard');
  });
}

exports.update = function (req, res, next) {

}

exports.del = function (req, res, next) {

}

exports.show = function (req, res, next) {
  if (!req.params.user) return next(new Error('No user'));
  req.models.User.findOne({name: req.params.user}, function (error, user) {
    if (error) return next(error);
    res.render('user', user);
  });
}

exports.showAll = function (req, res, next) {
  res.send('respond with a resource');
}

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

exports.authenticate = function(req, res, next) {
  if (!req.body.email || !req.body.password) {
  	return res.render('login', {error: 'Please enter your email and password.'});
  }
  req.models.User.findOne({
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
	req.models.User.findOne({email:req.session.user.email}, function(error, user) {
    	if (error) return next(error);
    	res.render('dashboard', {user:user});
    	//res.send({user:req.session.user.name});
  });
}
