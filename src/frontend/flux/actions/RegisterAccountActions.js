import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { createActions } from 'alt/utils/decorators';

import LoginActions from 'flux/actions/LoginActions';

let account;

@createActions(alt)
export default class RegisterAccountActions {
	constructor() {
		this.generateActions(
			'receiveUser',
			'receiveError'
		);
	}

	requestRegisterAccount(payload) {
		let url = [config.apiEndpoint, 'users'].join('/');
		account = payload;

		axios.post(url, payload)
			.then(res => {
				LoginActions.requestLogin(account.email, account.password);
			})
			.catch(res => {
				this.actions.receiveError(res.data.message);
			});
	}
}