import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import AllergiesActions from 'flux/actions/AllergiesActions';

@createStore(alt)
export default class AllergiesStore {
	constructor() {
		this.allergies = [];
	}

	@bind(AllergiesActions.receiveAllergies)
	updateAllergies(allergies) {
		this.allergies = allergies;
	}
}