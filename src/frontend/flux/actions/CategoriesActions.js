import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { createActions } from 'alt/utils/decorators';
import { stringify } from 'querystring';

@createActions(alt)
export default class CategoriesActions {
	constructor() {
		this.generateActions(
			'receiveCategories'
		);
	}

	requestCategories() {
		let url = [config.apiEndpoint, 'categories'].join('/');
		let restlessQuery = JSON.stringify({ order_by: [{"field":"parent_id","direction":"asc"}]});
		let query = stringify({ 
			results_per_page: 1000
		});

		url = url + '?' + query + '&q=' + restlessQuery;

		axios.get(url)
			.then(res => {
				this.actions.receiveCategories(res.data.objects);
			})
			.catch(e => {
				console.error(e);
			});
	}
}