import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import OrderActions from 'flux/actions/OrderActions';
import LoginActions from 'flux/actions/LoginActions';

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
		LoginActions.requestUser();
	}

	@bind(OrderActions.receiveOrders)
	updateOrders(orders) {
		this.orders = orders;
		LoginActions.requestUser();
	}

	@bind(OrderActions.receiveError)
	updateError(error) {
		this.error = error;
	}
}