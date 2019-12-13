import React from 'react';
import { Link } from 'react-router-dom';

function PostItem(props) {
	return (
		<li className="mb-3">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.author}</h5>
					<p className="card-text">{props.text}</p>
				</div>
			</div>
		</li>
	)
}

export default PostItem;