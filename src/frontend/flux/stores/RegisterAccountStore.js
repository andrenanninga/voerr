import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import RegisterAccountActions from 'flux/actions/RegisterAccountActions';

@createStore(alt)
export default class RegisterAccountStore {
	constructor() {
		this.error = null;
	}

	@bind(RegisterAccountActions.receiveError)
	updateError(error) {
		this.error = error;
	}
}