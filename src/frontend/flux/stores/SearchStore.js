import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import SearchActions from 'flux/actions/SearchActions';

@createStore(alt)
export default class SearchStore {
	constructor() {
		this.dishes = [];
	}

	@bind(SearchActions.receiveDishes)
	updateDishes(dishes) {
		this.dishes = dishes;
	}
}