import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Form } from 'formsy-react';

import LoginStore from 'flux/stores/LoginStore';
import RegisterAccountActions from 'flux/actions/RegisterAccountActions';

import Input from 'react/components/form/Input';

import 'assets/style/editAccount';

@connectToStores
export default class ProfilePage extends React.Component {
	static getStores(props) {
		return [LoginStore];
	}

	static getPropsFromStores(props) {
		return LoginStore.getState();
	}

	constructor(props) {
		super(props);

		this.state = {
			canSubmitAccountInfo: false,
			canSubmitPassword: false
		};
	}

	componentWillReceiveProps(props) {
		if(!LoginStore.state.user) {
			this.props.history.pushState({}, '/', '/');
		}
	}

	submitAccountInfo(data) {
		let payload = {
			name: data.name,
		};

		RegisterAccountActions.editAccount(payload, this.props.user.id);
	}

	submitPassword(data) {
		let payload = {
			password: data.password,
		};

		RegisterAccountActions.editAccount(payload, this.props.user.id);
	}

	enableSubmitAccountInfo() {
		this.setState({ canSubmitAccountInfo: true });
	}

	disableSubmitAccountInfo() {
		this.setState({ canSubmitAccountInfo: false });
	}

	enableSubmitPassword() {
		this.setState({ canSubmitPassword: true });
	}

	disableSubmitPassword() {
		this.setState({ canSubmitPassword: false });
	}

	render() {

		let error;
		let name;
		let email;
		if(this.props.user) {
			name = this.props.user.name;
			email = this.props.user.email;
		}

		if(this.props.error) {
			error = <span className="error">{this.props.error}</span>
		}

		return (
			<div className="accountPage">
				<div className="editAccount">
					<h2>Profiel</h2>
					{error}
					<Form onSubmit={this.submitAccountInfo.bind(this)} onValid={this.enableSubmitAccountInfo.bind(this)} onInvalid={this.disableSubmitAccountInfo.bind(this)}>
						<Input name="name" label="Naam" type="text" value={name} required/>
						<Input name="email" label="E-mailadres" type="text" value={email} required disabled
									 validations={{ isEmail: true }} validationErrors={{ isEmail: 'Dit is geen geldig emailadres' }} />
						<button type="submit" disabled={!this.state.canSubmitAccountInfo}>Wijzigingen opslaan</button>
					</Form>
				</div>
				<div className="editPassword">
					<h2>Wachtwoord wijzigen</h2> 
					{error}
					<Form onSubmit={this.submitPassword.bind(this)} onValid={this.enableSubmitPassword.bind(this)} onInvalid={this.disableSubmitPassword.bind(this)}>
						<Input name="password" label="Wachtwoord" type="password" required
									 validations={{ minLength: 8 }} validationErrors={{ minLength: 'Het wachtwoord moet minimaal 8 karakters lang zijn' }}/>
						<Input name="password_confirm" label="Wachtwoord herhalen" type="password" required 
									 validations={{ equalsField: 'password' }} validationErrors={{ equalsField: 'De wachtwoorden zijn niet gelijk' }}/>
						<button type="submit" disabled={!this.state.canSubmitPassword}>Wijzigingen opslaan</button>
					</Form>
				</div>
			</div>
		);
	}
}