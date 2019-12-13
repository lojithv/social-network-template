import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';


function Routes() {
	return (
		<Router>
			<div>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/signup' component={SignupPage} />
				<Route exact path='/login' component={LoginPage} />
				<Route exact path='/dashboard' component={DashboardPage} />
			</div>
		</Router>
	)
}

export default Routes;