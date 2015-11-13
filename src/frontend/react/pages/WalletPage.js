import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Form } from 'formsy-react';

import LoginStore from 'flux/stores/LoginStore';
import RegisterAccountActions from 'flux/actions/RegisterAccountActions';

import Input from 'react/components/form/Input';

import 'assets/style/wallet';

@connectToStores
export default class WalletPage extends React.Component {
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
		if(!LoginStore.state.user) {
			this.props.history.pushState({}, '', '/');
		}
	}

	submit(data) {
		let payload = {
			credit: (parseInt(this.props.user.credit, 10) + parseInt(data.credits.replace(',', '').replace('.', ''), 10)),
		};

		RegisterAccountActions.addCreditsToAccount(payload, this.props.user.id);
	}

	enableSubmit() {
		this.setState({ canSubmit: true });
	}

	disableSubmit() {
		this.setState({ canSubmit: false });
	}

	render() {

		let error;
		let success;

		if(this.props.error) {
			error = <span className="error">{this.props.error}</span>
		}

		console.log(this.props);

		if(this.props.success) {
			success = <span className="success">{this.props.success}</span>
		}

		return (
			<div className="addCredits">
				<h2>Geld toevoegen</h2>
				{error}
				{success}
				<Form onSubmit={this.submit.bind(this)} onValid={this.enableSubmit.bind(this)} onInvalid={this.disableSubmit.bind(this)}>
					<Input name="credits" label="Geld toevoegen" type="text" required 
								 validations={{ isNumeric: true }} validationErrors={{ isNumeric: 'Dit is geen geldig bedrag' }}
					 />
					<button type="submit" disabled={!this.state.canSubmit}>Credits toevoegen</button>
				</Form>
			</div>
		);
	}
}