import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { createActions } from 'alt/utils/decorators';
import { stringify } from 'querystring';
import { pick, identity } from 'lodash';

@createActions(alt)
export default class SearchActions {
	constructor() {
		this.generateActions(
			'receiveDishes'
		);
	}

	requestSearch(term, location = null, allergies = [], categories = []) {
		let url = [config.apiEndpoint, 'search', 'dishes'].join('/');
		let params = {
			term: term,
			location: location,
			allergies: allergies.join(','),
			categories: categories.join(',')
		};

		// create querystring with all params that are not falsy
		let query = stringify(pick(params, identity));

		url = url + '?' + query;

		axios.get(url)
			.then(res => {
				this.actions.receiveDishes(res.data.objects);
			})
			.catch(e => {
				console.error(e);
			});
	}
}