const chai = require('chai');
const expect = chai.expect;
const axios = require('axios');
//https://www.chaijs.com/api/bdd/
const host = 'http://localhost:3000';

describe('Static Routes', function() {
	it('should get home page', async function() {
		const response = await axios.get(host + '/');
		expect(response.status).to.equal(200);
	});

	it('should get login page', async function() {
		const response = await axios.get(host + '/login');
		expect(response.status).to.equal(200);
	});

	it('should get sigunup page', async function() {
		const response = await axios.get(host + '/signup'); 
		expect (response.status).to.equal(200);
	});
})