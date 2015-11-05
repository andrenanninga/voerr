import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import SearchResultActions from 'flux/actions/SearchResultActions';

@createStore(alt)
export default class SearchResultStore {
	constructor() {
		this.dishes = [];
	}

	@bind(SearchResultActions.receiveSearchResults)
	updateSearchResults(dishes) {
		this.dishes = dishes;
	}
}