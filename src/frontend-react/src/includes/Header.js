import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="navbar navbar-expand-sm navbar-dark bg-dark">
			<div className="container">
				<div className="navbar-nav float-left">
					<Link className="nav-item nav-link" to="/">Home</Link>
				</div>
				<div className=" navbar-nav float-right">
					<button className="btn btn-outline-light" data-toggle="modal" data-target="#postModal">New Post</button>
				</div>
			</div>
		</div>
	
	)
}

export default Header;