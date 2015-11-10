import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import SearchStore from 'flux/stores/SearchStore';
import SearchActions from 'flux/actions/SearchActions';

import Dish from 'react/components/Dish';	

import 'assets/style/searchResults';

@connectToStores
export default class SearchResultPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			location: props.params.location,
			term: props.params.term
		}
	}

	static getStores(props) {
		return [SearchStore];
	}

	static getPropsFromStores(props) {
		return SearchStore.getState();
	}

	componentWillMount() {
		SearchActions.requestSearch(
			this.state.term,
			this.state.location
		);
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