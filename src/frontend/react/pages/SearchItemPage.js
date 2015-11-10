import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import 'assets/style/dishDetail';

@connectToStores
export default class SearchItemPage extends React.Component {
	static getStores(props) {
		return [DishesStore];
	}

	static getPropsFromStores(props) {
		return DishesStore.getState();
	}

	componentWillMount() {
		DishesActions.requestDish(this.props.params.id);
	}

	render() {
		let dish = this.props.dishes[0];
		let url = '/s/' + this.props.params.location + '/' + this.props.params.term;

		if(!dish) {
			return <div></div>;
		}

		return <div className="dishDetail">
			<Link className="button" to={url}>&lt; Terug naar overzicht</Link>
			<h2>{dish.name}</h2>
			<img src="http://unsplash.it/1000/600?random"/>
			<div className="details">
				<div className="order">
					<button className="button-primary">Bestellen</button>
				</div>
				<p>
					{dish.description}
				</p>
				<div className="cook">
					<img src="http://unsplash.it/500/300?random"/>
					<h3>{dish.cook.name}</h3>
				</div>

			</div>
		</div>;		
	}
}