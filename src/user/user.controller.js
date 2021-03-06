const User = require('./user.model');
const Post = require('../post/post.model');
const bcrypt = require('bcryptjs');

module.exports = {
  logout,
  add,
  authenticate,
  update,
  del,
  show,
  showAll,
  showDashboard
}


function logout(req, res, next) {
  //clear the session
  req.session.destroy();
  res.redirect('/');
};

function add(req, res, next) {
  if(!req.body.username || !req.body.email || !req.body.password) {
    return res.render('pages/signup', {error: 'Enter name, email, and password'});
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
            if (err) return res.send('pages/signup', {error: err});
            req.session.user = user;
            req.session.admin = user.admin
            res.redirect('/dashboard');
          });
        });
      });
    } else {
      res.render('pages/signup', {error: 'User already exists'});
    }
  });

}

function authenticate(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.redirect('/login', {error: 'Please enter your email and password.'});
  }
  User.findOne({email:req.body.email}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.render('pages/login', {error: 'Incorrect email and password combination'});
    bcrypt.compare(req.body.password, user.password, function (err, authorized) {
      if (!authorized) {
        return res.render('pages/login', {error: 'Incorrect email and password combination'});
      } else {
        req.session.user = user;
        req.session.admin = user.admin
        res.redirect('/dashboard');
      }
    });

  });
};

function update(req, res, next) {
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

function del(req, res, next) {
  if (!req.params.user) return next(new Error('No user ID.'));
  User.remove({username: req.params.user}, function (err, user) {
    if(!user) return next(new Error('user not found'));
    if (err) return next(err);
    req.session.destroy();
    res.redirect('/');
  });
}

function show(req, res, next) {
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

function showAll(req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    //res.render('userlist', {user: req.session.user, users: users})
    res.json(users);
  });
}

function showDashboard(req, res, next) {
	User.findOne({email:req.session.user.email}, function(err, user) {
    	if (err) return next(err);
    	res.render('pages/dashboard', {user: user});
    	//res.send({user:req.session.user.name});
  });
}
