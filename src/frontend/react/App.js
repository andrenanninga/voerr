import React from 'react';
import { Link } from 'react-router';

import Nav from 'react/components/nav';
import Login from 'react/components/login';

import 'assets/style/app';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Nav/>
				<Login/>
				{this.props.children}
			</div>
		);
	}
}