import alt from 'connect';
import {createStore, bind} from 'alt/utils/decorators';
import DishActions from 'actions/dishActions';

@createStore(alt)
class DishStore {
	constructor() {
		this.dishes = [];
	}

	@bind(DishActions.updateDishes);
	updateDishes(dishes) {
		this.dishes = dishes;
	}
}

export default DishStore;