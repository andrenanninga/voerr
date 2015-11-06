import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import LoginActions from 'flux/actions/LoginActions';

@createActions(alt)
export default class LoginStore {
	constructor() {
		this.user = null;
	}

	@bind(LoginActions.receiveLogin)
	updateUser(user) {
		this.user = user;
	}
}