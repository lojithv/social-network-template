var boot = require('../app').boot,
  shutdown = require('../app').shutdown,
  port = require('../app').port,
  request = require('superagent').agent(),
  expect = require('chai').expect,
  seedUsers = require('../db/users.json');

describe('Users', function () {
  
  before(function () {
    boot();
  });

  it('gets home page route',function (done){
    request.get('http://localhost:' + port).end(function(err, res){
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('gets user list', function (done) {
    request.get('http://localhost:' + port).end(function(err, res){
        for (var i = 0; i < seedUsers.length; i++) {
          expect(res.text).to.contain(seedUsers[i].name);
        }
        done();
    });
  });

  it('gets login route', function (done) {
    request
      .get('http://localhost:' + port + '/login')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('logs in user', function (done) {
    request
      .post('http://localhost:' + port + '/login')
     // .auth(seedUsers[0].email, seedUsers[0].password)
      .send({email:"alberta@example.com", password:"alberta"})
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/dashboard');
        done();
      });

  });

  it('logs out user', function (done) {
    request.get('http://localhost:' + port + '/logout')
      .end(function(err, res){
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/');
        done();
    });

  });

  it('get dashboard route unauthorized', function (done) {
    request
      .get('http://localhost:' + port + '/dashboard')
      .end(function(err, res){
        expect(err).to.not.equal(null);
        done();
    });
  });


  it('adds new user', function (done) {
    request
      .post('http://localhost:' + port + '/signup')
      .send({name: "test", email: "test@example.com", password: "test"})
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/dashboard');
        
      });
    request
    .get('http://localhost:' + port + '/test')
    .end(function (err, res) {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      done();
    });
  });
  /*
  it('checks duplicate user', function (done) {
    request
      .post('http://localhost:' + port + '/signup')
      .send({name: "test", email: "test@example.com", password: "test"})
      .end(function (err, res) {
        expect(err).to.not.equal(null);
        expect(res.status).to.equal(401);
        done();
      });

  });

  it('updates user', function (done) {
    request
      .put('http://localhost:' + port + '/test')
      .send({name: "testing"})
      .end(function (err, res) {
        expect(err).to.equal(null);
        done();
      });

    request
      .get('http://localhost:' + port + '/testing')
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        done();
      });
  });


  it('deletes user', function (done) {
    request
      .delete('http://localhost:' + port + '/testing')
      .end(function (err, res) {
        expect(err).to.equal(null);
        done();
      });
    
    request
      .get('http://localhost:' + port + '/testing')
      .end(function (err, res) {
        expect(err).to.not.equal(null);
        expect(res.status).to.equal(404);
        done();
      });
  });
*/
  after(function () {
    shutdown();
  });

});