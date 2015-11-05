import React from 'react';
import { Link } from 'react-router';
import ClassNames from 'classnames';
import 'assets/style/nav';

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
			top = <h1><Link to="/">voerr</Link></h1>;
		}

		return (
			<div className="nav">
				{top}
				<nav onClick={this.onClickHamburger.bind(this)}>
					<ul className={ulClasses}>

						<li className="header"><h2>voerr</h2></li>

						<li><a href="#">Registreren</a></li>
						<li><a href="#">Inloggen</a></li>
						<li><a href="#">Hoe het Werkt</a></li>

					</ul>
				</nav>
			</div>
		);
	}
}