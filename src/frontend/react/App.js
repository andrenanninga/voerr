import React from 'react';
import { Link } from 'react-router';

import Nav from 'react/components/nav';
import LoginActions from 'flux/actions/LoginActions';

import 'assets/style/app';

export default class App extends React.Component {
	componentWillMount() {
		LoginActions.requestUser();
	}

	render() {
		return (
			<div>
				<Nav/>
				{this.props.children}
			</div>
		);
	}
}