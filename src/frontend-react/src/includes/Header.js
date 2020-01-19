import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="navbar navbar-expand-sm navbar-dark bg-dark">
			<div className="container">
				<div className="navbar-nav float-left">
					<Link className="nav-item nav-link" to="/">Home</Link>
				</div>
				<ul className="navbar-nav float-right">
					<li className="nav-item"><button className="btn btn-outline-light" data-toggle="modal" data-target="#postModal">New Post</button></li>
					<li className="nav-item"><Link className="btn btn-outline-light" to="/login">Login</Link></li>
				</ul>
			</div>
		</div>
	
	)
}

export default Header;