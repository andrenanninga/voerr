import React from 'react';
import 'style/nav';

export default class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<h1>voerr</h1>
				<input type="text" name="search" />
				<nav>
					<ul>

						<li><a href="#">browse</a></li>
						<li><a href="#">login</a></li>

					</ul>
				</nav>
			</div>
		);
	}
}