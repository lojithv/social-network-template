const boot = require('../app').boot,
  shutdown = require('../app').shutdown,
  port = require('../app').port,
  request = require('superagent').agent(),
  axios = require('axios'),
  expect = require('chai').expect,
  Post = require('./post.model'),
  {ObjectID} = require('mongodb');

describe('POST', function() {
  let id;
  const post = {
    text: 'This is a test',
    author: 'admin',
  }
  const posts = [{
    _id: new ObjectID(),
    text: 'post 1',
    author: 'author 1'
  }, {
    _id: new ObjectID(),
    text: 'post 2',
    author: 'author 2'
  }];

	before(function () {
    boot();
    
  });

  beforeEach(function(done) {
    Post.remove({})
    .then(function() {
      return Post.insertMany(posts);
    })
    .then(function() {
      done();
    })
  })

  after(function () {
    Post.remove({});
    shutdown();
  });

  it('should create a new post', async function () {
    let response;

    try {
      response = await axios.post('http://localhost:' + port + '/api/posts', post);

      id =  response.data._id;
    } catch (error) {
      console.log(error);
    } finally {
      expect(response.data.text).to.equal(post.text);
      expect(response.data.author).to.equal(post.author);
    }
    
  });

  it('should not create a post given invalid body data', function (done) {
    axios.post('http://localhost:' + port + '/api/posts')
    .then(function(response) {
      expect(response.status).to.equal(400);
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {
      done();
    });
  });

  it('get posts', async function() {
    let response;
    try {
      response = await axios.get('http://localhost:' + port + '/api/posts');
    } catch (error) {
      console.log(error);
    } finally {
      const count = response.data.length;

      expect(count).to.equal(2);
    }
  });

	it('get post', async function () {
		let response;
    try {
      response = await axios.get('http://localhost:' + port + '/api/posts/' + posts[0]._id.toHexString());
    } catch (error) {
      console.log(error);
    } finally {
      expect(response.data.text).to.equal(posts[0].text);
    }
  		
	});

  it('should return 404 if post not found when trying to get', function (done) {
    const id = new ObjectID().toHexString();
    axios.get('http://localhost:' + port + '/api/posts/' + id)
    .then(function(response){
      expect(response.status).to.equal(404);
    })
    .catch(function(error) {
      console.log(error);
    }) 
    .finally(function() {
      done();
    });
    
  });

	it('update post', async function () {
    let response;
		try {
      response = await axios.put('http://localhost:' + port + '/api/posts/' + posts[0]._id.toHexString(), {text: 'hello world'});
    } catch(error) {
      console.log(error);
    } finally {
      expect(response.data.text).to.equal('hello world');
    }
			
	});

	it('delete post', async function () {
		let response;
    try {
      response = await axios.delete('http://localhost:' + port + '/api/posts/' + posts[0]._id.toHexString());
    } catch(error) {
      console.log(error);
    } finally {
      expect(response.data.text).to.equal('post 1');
    }
	});

	it('should return 404 if post not found when trying to remove', function (done) {
    const id = new ObjectID().toHexString();
    
    axios.get('http://localhost:' + port + '/api/posts/' + id)
    .then(function(response) {
      expect(response.status).to.equal(404);
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {
      done();
    });
	});
  
});