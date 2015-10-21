import alt from 'connect';
import config from 'config';
import axios from 'axios';
import {createActions} from 'alt/utils/decorators';

@createActions(alt)
class DishActions {
	constructor() {
		this.generateActions(
			'updateDishes'
		);
	}

	fetchDishes() {
		console.log(config.apiEndpoint);
		axios.get(config.apiEndpoint + '/dishes')
			.then(res => {
				this.actions.updateDishes(res.data.dishes);
			})
			.catch(e => {
				console.error(e);
			});
	}
}

export default DishActions;