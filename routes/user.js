var User = require('../models/user');
var Post = require('../models/post');
var bcrypt = require('bcrypt');

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
    return res.render('signup', {err: 'Enter name, email, and password'});
  }
 
  User.findOne({username: req.body.username}, function (err, usrData) {
    if (usrData === null) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          var user = new User();
          user.username = req.body.username;
          user.email = req.body.email;
          user.password = hash;
          user.save(function (err, user) {
            if (err) return res.send('signup', {error: err});
            req.session.user = user;
            req.session.admin = user.admin
            res.redirect('/dashboard');
          });
        });
      });
    } else {
      res.render('signup', {error: 'User already exists'});
    }
  });

}

exports.authenticate = function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.render('login', {error: 'Please enter your email and password.'});
  }
  User.findOne({email:req.body.email}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.render('login', {error: 'Incorrect email and password combination'});
    bcrypt.compare(req.body.password, user.password, function (err, authorized) {
      if (!authorized) {
        return res.render('login', {error: 'Incorrect email and password combination'});
      } else {
        req.session.user = user;
        req.session.admin = user.admin
        res.redirect('/dashboard');
      }
    });

  });
};

exports.update = function (req, res, next) {
  //console.log('req.body.email', req.body.email);
  User.findOne({username: req.session.user.username}, function (err, user) {
    if (err) return res.render('error', {error: 'oops! something went wrong'});
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    
    user.save(function(err) {
      if (err) return res.send(err);
      req.session.user = user;
      res.redirect('/dashboard');
    });
  });
}

exports.del = function (req, res, next) {
  if (!req.params.user) return next(new Error('No user ID.'));
  User.remove({username: req.params.user}, function (err, user) {
    if(!user) return next(new Error('user not found'));
    if (err) return next(err);
    req.session.destroy();
    res.redirect('/');
  });
}

exports.show = function (req, res, next) {
  if (!req.params.user) return res.send(404);
  User.findOne({username: req.params.user}, function (err, profile) {
    if (err) return next(err);
    if(!profile) return res.sendStatus(404);
    Post.find({'author.username': profile.username}, null, {sort: {created_at: -1}}, function (err, posts) {
      if (err) return next(err);
      res.render('profile', {user: req.session.user, profile: profile, posts: posts});
    });
  });
}

exports.showAll = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.render('userlist', {user: req.session.user, users: users})
  });
}

exports.showDashboard = function(req, res, next) {
	User.findOne({email:req.session.user.email}, function(err, user) {
    	if (err) return next(err);
    	res.render('dashboard', {user: user});
    	//res.send({user:req.session.user.name});
  });
}
