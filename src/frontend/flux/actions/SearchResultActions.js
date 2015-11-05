import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { resolve } from 'url';
import { createActions } from 'alt/utils/decorators';

@createActions(alt)
export default class SearchResultActions {
	constructor() {
		this.generateActions(
			'receiveSearchResults'
		);
	}

	requestSearchResults() {
		let url = resolve(config.apiEndpoint, 'dishes');
		console.log(url);
		axios.get(url)
			.then(res => {
				this.actions.receiveSearchResults(res.data.objects);
			})
			.catch(e => {
				console.error(e);
			});
	}
}