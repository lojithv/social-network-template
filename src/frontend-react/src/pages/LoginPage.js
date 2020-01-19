import React, { Component } from 'react';
import App from '../App';

function LoginPage() {
	return (
		<App>
			<div class="section text-center">
			<div clas="container">
				<div class="form">
					<form method="POST" action="/auth" class="light-theme">
						<div class="container">
							<div class="form-header">
								<p class="lead">Log in to your account</p>
								
							</div>
							<div class="form-group">
								<input type="text" name="email" placeholder="Email address" />
							</div>
							<div class="form-group">
								<input type="password" name="password" placeholder="Password" />
							</div>
							<div class="form-group">
								<input type="submit" value="submit" name="submit" class="button button-default button-pill button-dark btn-block" />
							</div>
						</div>
					</form>
				</div>
				<p>New? <a href="/signup" class="button button-default button-pill button-dark-o">Signup</a></p>
			</div>
		</div>
		</App>
	)
}

export default LoginPage;