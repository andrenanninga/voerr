import React from 'react';
import { Form } from 'formsy-react';
import 'assets/style/login';

export default class Login extends React.Component {
	constructor() {
		super();

		this.state = {
			canSubmit: false
		};
	}

	allowSubmit() {
		this.setState({ canSubmit: true });
	}

	disallowSubmit() {
		this.setState({ canSubmit: false });
	}

	submit() {
		console.log(arguments);
	}

	render() {
		return (
			<div>
				<div className="overlay"></div>
				<div className="login">
					<h2>login</h2>
					<Form onValidSubmit={this.submit} onValid={this.allowSubmit} onInvalid={this.disallowSubmit}>
						<input type="text" name="email" placeholder="emailadres" validations="isEmail" validationError="poep" required/>
						<input type="password" name="password" placeholder="wachtwoord" required/>
						<label>
							<input type="checkbox" name="remember"/>
							<span className="label-body">Ingelogd blijven</span>
						</label>

						<button type="submit" className="button-primary" disabled={!this.state.canSubmit}>Inloggen</button>
					</Form>

					<hr/>

					<p>
						Nog geen account? <a href="#">Registreer nu!</a>
					</p>
				</div>
			</div>
		);
	}
}