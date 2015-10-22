var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	favicon = require('serve-favicon'),
	mongoose = require('mongoose'),
	models = require('./models'),
	dbUrl = 'mongodb://localhost:27017/blog' || process.env.MONGOLAB_URI,
	db = mongoose.connect(dbUrl, {safe: true}),
	//Express middleware
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	logger = require ('morgan'),
	errorHandler = require('errorhandler'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = express();
app.locals.appTitle = 'The Network';
//Express configurations
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join('public', 'favicon.ico')));
//Express middleware configuration
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
//exposes the res.session object in each request
//handler and stores data
app.use(session({
	secret: '2C44774A-D649-4D44-9535-46E296EF984F',
	resave: false,
	saveUninitialized: false}));
app.use(methodOverride());

//authentication middleware
app.use(function (req, res, next) {
	if (req.session && req.session.admin) {
		res.locals.admin = true;
	}
	next();
});

//authorization middleware
var authorize = function (req, res, next) {
	if (req.session && req.session.admin) {
		return next();
	} else {
		return res.sendStatus(401);
	}
};

if ('development' === app.get('env')) {
	app.use(errorHandler());
}

//Pages and routes
app.get('/', routes.index);
app.get('/signup', routes.user.signup);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/dashboard', authorize, routes.user.showDashboard);
app.get('/users', routes.user.showAll);
app.get('/:user', routes.user.show);
app.post('/signup', routes.user.add);
app.post('/:user', routes.user.update);
app.delete('/:user', routes.user.del);

app.all('/api', authorize);
app.get('/api/posts', routes.post.list);
app.post('/api/posts', routes.post.add);
app.put('/api/posts/:id', routes.post.edit);
app.delete('/api/posts/:id', routes.post.del);

app.all('*', function (req, res) {
	res.sendStatus(404);
});

var server = http.createServer(app);

var boot = function () {
	server.listen(app.get('port'), function () {
		console.info('Express server listening on port', app.get('port'));
	});
};

var shutdown = function () {
	server.close();
};

if (require.main === module) {
	boot();
} else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}

