import React from 'react';
import { Redirect } from 'react-router';

class Modal extends React.Component {
	
	render() {
		return (
			<div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Create New Post</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <form onSubmit={this.props.handleSubmit}>
			        	
			        	<div class="form-group">
			        		<label>Name</label>
			        		<input type="text" name="author"  class="form-control" minlength="1" maxlength="82" onChange={this.props.handleAuthorChange} />
			        	</div>
			        	<div class="form-group">
			        		<label>Text</label>
			        		<textarea onChange={this.props.handleTextChange} name="text" rows="4" class="form-control" minlength="1" maxlength="82" placeholder="82 character limit"></textarea>
			        	</div>
			        	<div class="form-group float-right">
			        		<input type="submit" value="submit" id="post" class="btn btn-primary" />
			        	</div>
			        </form>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
	
}

export default Modal;