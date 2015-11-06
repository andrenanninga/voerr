import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';

@createAction(alt)
export default class LoginActions {
	constructor() {
		this.generateActions(
			'receiveUser'
		);
	}

	requestUser(email, password) {
		let url = [config.apiEndpoint, 'login'].join('/');
		let payload = { 
			email: email,
			password: password
		};

		axios.post(url, params)
			.then(res => {
				console.log(res);
			})
			.catch(e => {
				console.error(e);
			});
	}
}