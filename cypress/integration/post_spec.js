
describe('Creating a post', function() {

	it('creates a post successfully', function() {
		cy.server();
		cy.route('POST', '/api/posts').as('createPost');
		//go to the web page
		cy.visit('http://localhost:3000/');
		//click the new post button
		cy.contains('New Post').click();
		//enter a username and text
		cy.get('input[name=author]').type('Author');
		cy.get('textarea').type('test post');
		//click submit
		cy.contains('submit').click();
		cy.wait('@createPost', {timeout: 10000});
		//should see the post on the page
		cy.get('.card-text').first().should('have.text', 'test post');
	});
});