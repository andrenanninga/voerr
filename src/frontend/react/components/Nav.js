import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import ClassNames from 'classnames';

import LoginStore from 'flux/stores/LoginStore';

import 'assets/style/nav';

@connectToStores
export default class Nav extends React.Component {
	static getStores(props) {
		return [LoginStore];
	}

	static getPropsFromStores(props) {
		return LoginStore.getState();
	}

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

		let links;

		if(this.props.user) {
			links = [
				<li>Welkom {this.props.user.name}</li>,
				<li><a href='#'>Account</a></li>,
				<li><a href='#'>Hoe het werkt</a></li>,
				<li><a href='#'>Uitloggen</a></li>
			];
		}
		else {
			links = [
				<li><a href='/login'>Inloggen</a></li>,
				<li><a href='#'>Registeren</a></li>,
				<li><a href='#'>Hoe het werkt</a></li>
			];
		}

		return (
			<div className="nav">
				{top}
				<nav onClick={this.onClickHamburger.bind(this)}>
					<ul className={ulClasses}>

						<li className="header"><h2>voerr</h2></li>

						{links}

					</ul>
				</nav>
			</div>
		);
	}
}