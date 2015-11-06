import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import Dish from 'react/components/Dish';	

import 'assets/style/searchResults';

@connectToStores
export default class SearchResultPage extends React.Component {

	static getStores(props) {
		return [DishesStore];
	}

	static getPropsFromStores(props) {
		return DishesStore.getState();
	}

	componentWillMount() {
		DishesActions.requestDishes();
	}

	render() {
		let dishes = this.props.dishes.map(dish => {
			let key = 'dish_' + dish.id;
			let url = '/s/' + this.props.params.location + '/' + this.props.params.term + '/' + dish.id;
			return <Dish key={key} url={url} {...dish} />;
		});

		return <div className="searchResults">{dishes}</div>
	}
}