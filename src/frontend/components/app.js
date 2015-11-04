import React from 'react';
import { Link } from 'react-router';
import Nav from 'components/nav';
import 'style/app';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Nav/>
				{this.props.children}
			</div>
		);
	}
}