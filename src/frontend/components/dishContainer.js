import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import DishActions from 'actions/dishActions';
import DishStore from 'stores/dishStore';
import Dish from 'components/Dish';
import 'style/dishContainer';

@connectToStores
class DishContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	static getStores(props) {
		return [DishStore];
	}

	static getPropsFromStores(props) {
		return DishStore.getState();
	}

	componentWillMount() {
		DishActions.fetchDishes();
	}
	
	render() {
		let dishes = this.props.dishes.map((dish) => {
			let key = 'dish_' + dish.id;
			return <Dish key={key} {...dish} />
		});

		return <div className="dishContainer">{dishes}</div>;
	}
}

export default DishContainer;