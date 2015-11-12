import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Form } from 'formsy-react';

import LoginStore from 'flux/stores/LoginStore';
import RegisterAccountStore from 'flux/stores/RegisterAccountStore';
import RegisterAccountActions from 'flux/actions/RegisterAccountActions';

import Input from 'react/components/form/Input';

import 'assets/style/registerAccount';

@connectToStores
export default class WalletPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			canSubmit: false
		};
	}

	static getStores(props) {
		return [RegisterAccountStore, LoginStore];
	}

	static getPropsFromStores(props) {
		return RegisterAccountStore.getState();
	}

	componentWillReceiveProps(props) {
		if(LoginStore.state.user) {
			this.props.history.pushState(null, '/');
		}
	}

	submit(data) {
		let payload = {
			name: data.name,
			email: data.email,
			password: data.password
		};

		RegisterAccountActions.requestRegisterAccount(payload);
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
			<div className="registerAccount">
				<h2>Profiel</h2>
				{error}
				<Form onSubmit={this.submit} onValid={this.enableSubmit.bind(this)} onInvalid={this.disableSubmit.bind(this)}>
					<Input name="name" label="naam" type="text" required/>
					<Input name="email" label="emailadres" type="text" required 
								 validations={{ isEmail: true }} validationErrors={{ isEmail: 'Dit is geen geldig emailadres' }} />
					<Input name="password" label="wachtwoord" type="password" required
								 validations={{ minLength: 8 }} validationErrors={{ minLength: 'Het wachtwoord moet minimaal 8 karakters lang zijn' }}/>
					<Input name="password_confirm" label="wachtwoord herhalen" type="password" required 
								 validations={{ equalsField: 'password' }} validationErrors={{ equalsField: 'De wachtwoorden zijn niet gelijk' }}/>
					<button type="submit" disabled={!this.state.canSubmit}>Account registeren</button>
				</Form>
			</div>
		);
	}
}