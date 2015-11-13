import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import LoginActions from 'flux/actions/LoginActions';
import RegisterAccountActions from 'flux/actions/RegisterAccountActions';

@createStore(alt)
export default class LoginStore {
	constructor() {
		this.user = null;
		this.error = null;
		this.success = null;
	}

	@bind(LoginActions.receiveUser)
	@bind(RegisterAccountActions.receiveUser)
	updateUser(user) {
		this.user = user;
	}

	@bind(LoginActions.receiveError)
	updateError(error) {
		this.error = error;
	}
}