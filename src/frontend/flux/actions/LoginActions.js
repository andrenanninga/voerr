import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { isEmpty } from 'lodash';
import { createActions } from 'alt/utils/decorators';

@createActions(alt)
export default class LoginActions {
	constructor() {
		this.generateActions(
			'receiveUser',
			'receiveError'
		);
	}

	requestLogin(email, password) {
		let url = [config.apiEndpoint, 'login'].join('/');
		let payload = { 
			email: email,
			password: password
		};

		axios.post(url, payload)
			.then(res => {
				this.actions.receiveError(null);
				this.actions.receiveUser(res.data);
			})
			.catch(res => {
				this.actions.receiveError(res.data['Failed login']);
			});
	}

	requestLogout() {
		let url = [config.apiEndpoint, 'login', 'logout'].join('/');

		axios.post(url)
			.then(res => {
				this.actions.receiveUser(null);
			})
			.then(res => {
				console.log(res);
			});
	}

	requestUser() {
		let url = [config.apiEndpoint, 'login', 'current_user'].join('/');

		axios.get(url)
			.then(res => {
				if(!isEmpty(res.data)) {
					this.actions.receiveUser(res.data);
				}
			})
			.catch(res => {
				console.log(res);
			});
	}
}