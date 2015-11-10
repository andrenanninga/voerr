import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { createActions } from 'alt/utils/decorators';
import { stringify } from 'querystring';

@createActions(alt)
export default class AllergiesActions {
	constructor() {
		this.generateActions(
			'receiveAllergies'
		);
	}

	requestAllergies() {
		let url = [config.apiEndpoint, 'allergies'].join('/');
		let query = stringify({ 
			results_per_page: 1000
		});

		url = url + '?' + query;

		axios.get(url)
			.then(res => {
				this.actions.receiveAllergies(res.data.objects);
			})
			.catch(e => {
				console.error(e);
			});
	}
}