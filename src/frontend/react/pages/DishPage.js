import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import 'assets/style/dishDetail';

@connectToStores
export default class DishPage extends React.Component {
	static getStores(props) {
		return [DishesStore];
	}

	static getPropsFromStores(props) {
		return DishesStore.getState();
	}

	componentWillMount() {
		DishesActions.requestDish(this.props.params.id);
	}

	handleBackToOverview() {
		// this.props.history.pushState(null, '/s/' + slug(this.props.params.location) + '/' + slug(this.props.params.food));
	}

	render() {
		let dish = this.props.dishes[0];
		console.log(dish);

		if(!dish) {
			return <div></div>;
		}

		return <div className="dishDetail">
			<button onClick={this.handleBackToOverview}>&lt; Terug naar overzicht</button>
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