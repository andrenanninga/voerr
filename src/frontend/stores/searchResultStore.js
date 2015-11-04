import alt from 'connect';
import { createStore, bind } from 'alt/utils/decorators';

@createStore(alt)
export default class SearchResultStore {
	constructor() {
		this.results = [];
	};
}