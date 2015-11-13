import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import dateFormat from 'dateformat-light';
import { createActions } from 'alt/utils/decorators';

@createActions(alt)
export default class OrderActions {
	constructor() {
		this.generateActions(
			'clear',
			'receiveOrder',
			'receiveOrders',
			'receiveError'
		);
	}

	requestUserOrders(user_id) {
		let url = [config.apiEndpoint, 'orders'].join('/');
		let query = {
			filters: [
				{ name: 'user_id', op: 'eq', val: user_id }
			],
			order_by: [
				{ field: 'start_time', 'direction': 'desc' }
			]
		};

		url = url + '?q=' + JSON.stringify(query);

		axios.get(url)
			.then(res => {
				if(res.data.num_results) {
					this.actions.receiveOrders(res.data.objects);
				}
			})
			.catch(e => {
				console.error(e);
			})
	}

	requestOrder(meal_id, user_id) {
		let today = dateFormat(new Date(), 'yyyy-mm-dd') + 'T00:00:00';
		let url = [config.apiEndpoint, 'orders'].join('/');
		let query = { 
			filters: [
				{ name: 'meal_id', op: 'eq', val: meal_id }, 
				{ name: 'user_id', op: 'eq', val: user_id },
				{ name: 'start_time', op: 'gt', val: today },
			],
			order_by: [
				{ field: 'date_created', direction: 'asc' }
			],
			limit: 1
		};

		url = url + '?q=' + JSON.stringify(query);
		console.log(url);

		axios.get(url)
			.then(res => {
				console.log(res.data);
				if(res.data.num_results) {
					this.actions.receiveOrder(res.data.objects[0]);
				}
			})
			.catch(e => {
				console.error(e);
			});
	}

	postOrder(meal) {
		let url = [config.apiEndpoint, 'orders'].join('/');
		let payload = {
			meal_id: meal.id,
			amount_meals: 1,
			is_takeout: false,
			start_time: meal.dinner_time
		};

		axios.post(url, payload)
			.then(res => {
				this.actions.receiveError(null);
				this.actions.receiveOrder(res.data);
			})
			.catch(res => {
				this.actions.receiveError(res.data.message);
			});
	}
}