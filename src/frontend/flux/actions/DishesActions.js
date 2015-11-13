import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { createActions } from 'alt/utils/decorators';

@createActions(alt)
export default class DishesActions {
	constructor() {
		this.generateActions(
			'receiveDishes'
		);
	}

	requestDishes() {
		let url = [config.apiEndpoint, 'dishes'].join('/');
		axios.get(url)
			.then(res => {
				this.actions.receiveDishes(res.data.objects);
			})
			.catch(e => {
				console.error(e);
			});
	}

	requestDish(id) {
		let url = [config.apiEndpoint, 'dishes', id].join('/');
		console.log(url);

		axios.get(url)
			.then(res => {
				this.actions.receiveDishes([res.data]);
			})
			.catch(e => {
				console.error(e);
			});
	}

	requestUserDishes(cook_id) {
		let url = [config.apiEndpoint, 'dishes'].join('/');
		let query = {
			filters: [
				{ name: 'cook_id', op: 'eq', val: cook_id }
			],
			order_by: [
				{ field: 'date_updated', 'direction': 'desc' }
			]
		};

		url = url + '?q=' + JSON.stringify(query);

		axios.get(url)
			.then(res => {
				if(res.data.num_results) {
					this.actions.receiveDishes(res.data.objects);
				}
			})
			.catch(e => {
				console.error(e);
			})
	}
}