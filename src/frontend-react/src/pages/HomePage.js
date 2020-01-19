import React, { Component } from 'react';
import App from '../App';
import PostList from '../components/post/PostList';
import axios from 'axios';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		
		axios.get('/api/index')
		.then(response => {
			console.log(response);
			this.setState({posts: response.data})
			
		})
		.catch(error => console.log(error));
	}

	render() {
		return (
			<App>
				<div className="bg home-bg page-header text-center">
					<div className="container">
						<h1>
							The Network
						</h1>
					</div>
				</div>
				<div className="section">
					<div className="col-sm-6 offset-md-3">
						<PostList posts={this.state.posts} />
					</div>
				</div> 
			</App>
		)
	}
	
}

export default HomePage;