import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import OrderActions from 'flux/actions/OrderActions';

@createStore(alt)
export default class OrderStore {
	constructor() {
		this.orders = [];
		this.error = null;
	}

	@bind(OrderActions.clear)
	clear() {
		this.orders = [];
		this.error = null;
	}

	@bind(OrderActions.receiveOrder)
	updateOrder(order) {
		this.orders = [order];
	}

	@bind(OrderActions.receiveOrders)
	updateOrders(orders) {
		this.orders = orders;
	}

	@bind(OrderActions.receiveError)
	updateError(error) {
		this.error = error;
	}
}