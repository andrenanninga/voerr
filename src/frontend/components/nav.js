import React from 'react';
import ClassNames from 'classnames';
import 'style/nav';

export default class Nav extends React.Component {
	constructor() {
		super();

		this.state = {
			showSearch: false,
			navOpen: false
		};
	}

	onClickHamburger() {
		this.setState({ navOpen: !this.state.navOpen });
	}

	render() {
		let ulClasses = ClassNames({ open: this.state.navOpen });
		let top; 

		if(this.state.showSearch) {
			top = <input type="text" name="search" />;
		}
		else {
			top = <h1>voerr</h1>;
		}

		return (
			<div className="nav">
				{top}
				<nav onClick={this.onClickHamburger.bind(this)}>
					<ul className={ulClasses}>

						<li className="header"><h2>voerr</h2></li>

						<li><a href="#">Browse</a></li>
						<li><a href="#">Sign Up</a></li>
						<li><a href="#">Log In</a></li>
						<li><a href="#">How it Works</a></li>

					</ul>
				</nav>
			</div>
		);
	}
}