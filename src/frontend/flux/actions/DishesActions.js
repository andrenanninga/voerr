import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { resolve } from 'url';
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
}