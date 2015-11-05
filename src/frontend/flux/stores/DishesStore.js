import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import DishesActions from 'flux/actions/DishesActions';

@createStore(alt)
export default class DishesStore {
	constructor() {
		this.dishes = [];
	}

	@bind(DishesActions.receiveDishes)
	updateDishes(dishes) {
		this.dishes = dishes;
	}
}