var boot = require('../app').boot,
  shutdown = require('../app').shutdown,
  port = require('../app').port,
  request = require('superagent').agent(),
  expect = require('chai').expect;

var id;
var post = {
	text: 'This is a test',
  author: 'admin',
};

var user = {
	email: "admin@example.com",
	password: "admin"
};

describe('POST', function () {
	before(function (done) {
    boot();
    request
      .post('http://localhost:' + port + '/login')
      .send(user)
      .end(function (err, res) {
        done();
      });
  });

  it('get posts', function (done) {
  	request
  		.get('localhost:' + port + '/api/posts')
  		.send(user)
  		.end(function (err, res) {
  			var count = 0;
  			for (var i in res.body) {
  				count++;
  			}
  			expect(count).to.equal(8);
  			expect(res.status).to.equal(200);
  			done();
  		});
  });

	it('create post', function (done) {
		request
			.post('localhost:' + port + '/api/posts')
			.send(post)
			.end(function (err, res) {
				id = res.body._id;
				expect(res.body.text).to.equal(post.text);
				expect(res.body.author.username).to.equal('admin');
				expect(res.body.media).to.equal("text");
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('get post', function (done) {
		request
  		.get('localhost:' + port + '/api/posts/' + id)
  		.end(function (err, res) {
  			expect(res.status).to.equal(200);
  			done();
  		});
	});

	it('update post', function (done) {
		request
			.put('localhost:' + port + '/api/posts/' + id)
			.send({text: 'hello world'})
			.end(function (err, res) {
				expect(res.body.text).to.equal('hello world');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('delete post', function (done) {
		request
			.del('localhost:' + port + '/api/posts/' + id)
			.end(function (err, res) {
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('check for deleted post', function (done) {
		request
  		.get('localhost:' + port + '/api/posts/' + id)
  		.end(function (err, res) {
  			expect(res.body).to.equal(null);
  			done();
  		});
	});

	it('ensure only 8 posts', function (done) {
		request
  		.get('localhost:' + port + '/api/posts')
  		.end(function (err, res) {
  			var count = 0;
  			for (var i in res.body) {
  				count++;
  			}
  			expect(count).to.equal(8);
  			expect(res.status).to.equal(200);
  			done();
  		});
  	});

  after(function () {
    shutdown();
  });
});