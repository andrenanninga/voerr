import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import LoginActions from 'flux/actions/LoginActions';

@createStore(alt)
export default class LoginStore {
	constructor() {
		this.user = null;
		this.error = null;
	}

	@bind(LoginActions.receiveUser)
	updateUser(user) {
		this.user = user;
	}

	@bind(LoginActions.receiveError)
	updateError(error) {
		this.error = error;
	}
}