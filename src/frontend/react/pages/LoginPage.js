import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router';
import { Form } from 'formsy-react';

import LoginStore from 'flux/stores/LoginStore';
import LoginActions from 'flux/actions/LoginActions';

import Input from 'react/components/form/Input';

import 'assets/style/login';

@connectToStores
export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			canSubmit: false
		};
	}

	static getStores(props) {
		return [LoginStore];
	}

	static getPropsFromStores(props) {
		return LoginStore.getState();
	}

	componentWillReceiveProps(props) {
		if(props.user) {
			this.props.history.pushState({}, '/', '/');
		}
	}

	submit(data) {
		LoginActions.requestLogin(data.email, data.password);
	}

	enableSubmit() {
		this.setState({ canSubmit: true });
	}

	disableSubmit() {
		this.setState({ canSubmit: false });
	}

	render() {
		let error;

		if(this.props.error) {
			error = <span className="error">{this.props.error}</span>
		}

		return (
			<div>
				<div className="login">
					<h2>login</h2>
					{error}
					<Form onSubmit={this.submit} onValid={this.enableSubmit.bind(this)} onInvalid={this.disableSubmit.bind(this)}>
						<Input name="email" label="emailadres" type="text" required validations="isEmail" validationError="Dit is geen geldig emailadres"/>
						<Input name="password" label="wachtwoord" type="password" required />
						<button type="submit" disabled={!this.state.canSubmit}>Inloggen</button>
					</Form>
					<hr/>

					<p>
						Nog geen account? <Link to="/registeren">Registreer je nu!</Link>
					</p>
				</div>
			</div>
		);
	}
}