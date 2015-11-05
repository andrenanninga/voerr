import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import SearchResultStore from 'flux/stores/SearchResultStore';
import SearchResultActions from 'flux/actions/SearchResultActions';

import Dish from 'react/components/Dish';	

import 'assets/style/searchResults';

@connectToStores
export default class SearchResultPage extends React.Component {

	static getStores(props) {
		return [SearchResultStore];
	}

	static getPropsFromStores(props) {
		return SearchResultStore.getState();
	}

	componentWillMount() {
		SearchResultActions.requestSearchResults();
	}

	render() {
		let dishes = this.props.dishes.map(dish => {
			let key = 'dish_' + dish.id;
			return <Dish key={key} {...dish} />;
		});

		return <div className="searchResults">{dishes}</div>
	}
}