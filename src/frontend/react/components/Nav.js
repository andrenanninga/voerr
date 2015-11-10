import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import ClassNames from 'classnames';

import LoginStore from 'flux/stores/LoginStore';
import LoginActions from 'flux/actions/LoginActions';

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

	onLogout() {
		LoginActions.requestLogout();
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
				<li key="account"><a href='#'>{this.props.user.name}</a></li>,
				<li key="how"><a href='#'>Hoe het werkt</a></li>,
				<li key="logout"><a href='#' onClick={this.onLogout.bind(this)}>Uitloggen</a></li>
			];
		}
		else {
			links = [
				<li key="login"><Link to='/inloggen'>Inloggen</Link></li>,
				<li key="register"><Link to='/registeren'>Registeren</Link></li>,
				<li key="how"><a href='#'>Hoe het werkt</a></li>
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